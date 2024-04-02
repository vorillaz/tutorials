import { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import * as s from '../db/schema';

const schema = {
  operationId: 'respondToRide',
  body: {
    type: 'object',
    required: ['driver_id', 'ride_id'],
    properties: {
      driver_id: { type: 'integer' },
      ride_id: { type: 'integer' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
} as const;

const driver: FastifyPluginAsync = async server => {
  const { db } = server;
  server.post<{
    Body: FromSchema<(typeof schema)['body']>;
  }>(
    '/accept',
    {
      schema,
    },
    async (request, reply) => {
      const { body } = request;

      await server.inngest.send({
        id: 'driver-accept' + request.id,
        name: 'app/ride.driver.accept',
        data: {
          ride_id: body.ride_id,
          driver_id: body.driver_id,
        },
      });

      reply.send({ message: 'Ride accepted' });
    },
  );

  server.post<{
    Body: FromSchema<(typeof schema)['body']>;
  }>(
    '/reject',
    {
      schema,
    },
    async (request, reply) => {
      const { body } = request;

      await server.inngest.send({
        id: 'driver-accept' + request.id,
        name: 'app/ride.driver.reject',
        data: {
          ride_id: body.ride_id,
          driver_id: body.driver_id,
        },
      });

      reply.send({ message: 'Ride rejected' });
    },
  );
};

export default driver;
