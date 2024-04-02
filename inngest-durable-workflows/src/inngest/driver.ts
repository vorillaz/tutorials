import { eq } from 'drizzle-orm';
import { inngest } from './client';
import Log from '../log';
import { db, schema } from '../db';

type DriverActionStatus = schema.ride_status.accepted | null;

const driverAction = async (
  status: DriverActionStatus,
  rideId: number,
  driverId: number,
  driverResponse: schema.driver_response,
) => {
  await db.transaction(async tx => {
    if (status !== null) {
      await tx
        .update(schema.rideRequests)
        .set({
          status: status,
          updatedAt: new Date(),
        })
        .where(eq(schema.rideRequests.id, rideId));
    }

    await tx.insert(schema.driverResponses).values([
      {
        driverId: driverId,
        rideRequestId: rideId,
        response: driverResponse,
        createdAt: new Date(),
      },
    ]);
  });
};

const driverAccept = inngest.createFunction(
  {
    id: 'driver-accept',
  },
  { event: 'app/ride.driver.accept' },
  async ({ event, step }) => {
    const log = Log.getInstance();
    const msg = `Driver accepted ${event.data.ride_id}`;

    try {
      await driverAction(
        schema.ride_status.accepted,
        event.data.ride_id,
        event.data.driver_id,
        schema.driver_response.accepted,
      );
    } catch (error) {
      log.addMessage(`Error accepting ride: ${error}`);
      return {
        message: `Error accepting ride: ${error}, ride_id: ${event.data.ride_id}, driver_id: ${event.data.driver_id}`,
      };
    }

    log.addMessage(msg);
    return {
      message: msg,
    };
  },
);

const driverReject = inngest.createFunction(
  {
    id: 'driver-reject',
  },
  { event: 'app/ride.driver.reject' },
  async ({ event, step }) => {
    const log = Log.getInstance();

    await driverAction(
      null,
      event.data.ride_id,
      event.data.driver_id,
      schema.driver_response.accepted,
    );
    const msg = `Driver rejected ${event.data.ride_id}`;
    log.addMessage(msg);
    return {
      message: msg,
    };
  },
);

export { driverAccept, driverReject };
