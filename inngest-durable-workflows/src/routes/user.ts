import { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { schema } from '../db';
import Log from '../log';

const createSchema = {
  operationId: 'bookRide',
  body: {
    type: 'object',
    required: ['user_id'],
    properties: {
      user_id: { type: 'integer' },
    },
  },
} as const;

const client: FastifyPluginAsync = async server => {
  const { db, inngest } = server;
  const log = Log.getInstance();
  const hasRequested = async (userId: number) => {
    const ride = await db.query.rideRequests.findFirst({
      where: (reqs, { eq, and }) => {
        return and(
          eq(reqs.userId, userId),
          eq(reqs.status, schema.ride_status.pending),
        );
      },
    });

    if (ride) {
      return true;
    }

    return false;
  };

  // Book a ride
  server.post<{
    Body: FromSchema<(typeof createSchema)['body']>;
  }>('/book', { schema: createSchema }, async (request, reply) => {
    const { body } = request;
    const { user_id } = body;
    const pending = await hasRequested(user_id);

    if (pending) {
      log.addMessage(`User has pending requests`);
      return reply.code(400).send({
        message: 'User has pending requests',
      });
    }

    const ins = await db
      .insert(schema.rideRequests)
      .values({
        userId: user_id,
        status: schema.ride_status.pending,
        createdAt: new Date(),
      })
      .returning({ insertedId: schema.rideRequests.id })
      .then(res => res[0]);

    await inngest.send({
      id: 'user-book-' + request.id,
      name: 'app/ride.user.request',
      data: {
        user_id: user_id,
        ride_id: ins.insertedId,
      },
    });
    return {
      message: 'Ride booked',
      ride_id: ins.insertedId,
    };
  });
  // Cancel a ride
  server.post('/cancel', async (request, reply) => {});

  // Get all rides
  server.get('/rides', async (request, reply) => {
    const result = await db.query.rideRequests.findMany({
      with: {
        user: true,
        responses: true,
      },
    });
    return result;
  });
};

export default client;
