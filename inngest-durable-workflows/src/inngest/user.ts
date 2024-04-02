import { inngest } from './client';
import Log from '../log';

const rideCancel = inngest.createFunction(
  { id: 'user-cancel' },
  { event: 'app/ride.user.cancel' },
  async ({ event, step }) => {
    const { ride_id, user_id } = event.data;
    const log = Log.getInstance();
    log.addMessage(`User canceled ride ${ride_id}`);

    const msg = `Ride ${ride_id} canceled by user ${user_id}`;
    return {
      message: msg,
    };
  },
);

const rideRequest = inngest.createFunction(
  { id: 'user-book' },
  { event: 'app/ride.user.request' },
  async ({ event, step }) => {
    const { user_id, ride_id } = event.data;
    const msg = 'Ride book request received for user ' + user_id;

    // trigger timeout
    await step.sendEvent('fan-out-request', {
      name: 'app/ride.timeout',
      data: { ride_id },
    });
    return {
      message: msg,
    };
  },
);

export { rideRequest, rideCancel };
