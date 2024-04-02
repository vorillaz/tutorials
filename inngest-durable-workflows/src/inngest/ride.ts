import { eq } from 'drizzle-orm';
import { inngest } from './client';
import Log from '../log';
import { RIDE_TIMEOUT } from '../constants';
import { db, schema } from '../db';

const timeout = inngest.createFunction(
  {
    id: 'book-timeout',
    cancelOn: [
      { event: 'app/ride.driver.accept', match: 'data.ride_id' },
      { event: 'app/ride.user.cancel', match: 'data.ride_id' },
    ],
  },
  { event: 'app/ride.timeout' },
  async ({ event, step }) => {
    await step.sleep('wait-for-timeout', RIDE_TIMEOUT);

    // check if the ride is already accepted or canceled
    const ride = await db.query.rideRequests.findFirst({
      where: (reqs, { eq }) => eq(reqs.id, event.data.ride_id),
    });

    if (ride?.status !== schema.ride_status.pending) {
      return {
        message: `Ride ${event.data.ride_id} is not in the right status to be timed out.`,
      };
    }

    // update the ride status to timed_out
    await db
      .update(schema.rideRequests)
      .set({
        status: schema.ride_status.timed_out,
        updatedAt: new Date(),
      })
      .where(eq(schema.rideRequests.id, event.data.ride_id));

    const log = Log.getInstance();
    const msg = `Ride timeout ${event.data.ride_id}`;
    log.addMessage(msg);
    return {
      message: msg,
    };
  },
);

export { timeout };
