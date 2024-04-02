import { rideRequest } from './user';
import { timeout } from './ride';
import { driverAccept, driverReject } from './driver';

export const functions = [
  // User functions
  rideRequest,
  // Ride functions
  timeout,
  // Driver functions
  driverAccept,
  driverReject,
];

export { inngest } from './client';
