import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export enum ride_status {
  cancelled = 'cancelled', // canceled by user
  pending = 'pending', // waiting for driver response
  accepted = 'accepted', // accepted by driver
  no_drivers = 'no_drivers', // no drivers available
  timed_out = 'timed_out', // no response from drivers
}

export enum driver_response {
  accepted = 'accepted',
  rejected = 'rejected',
}

export const request_status = [
  ride_status.accepted,
  ride_status.pending,
  ride_status.no_drivers,
  ride_status.timed_out,
] as const;

export const drivers_responses = [
  driver_response.accepted,
  driver_response.rejected,
] as const;

export const users = sqliteTable('users', {
  id: integer('id').primaryKey().primaryKey({ autoIncrement: true }),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  rideRequests: many(rideRequests),
}));

export const drivers = sqliteTable('drivers', {
  id: integer('id').primaryKey().primaryKey({ autoIncrement: true }),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const driversRelations = relations(drivers, ({ many }) => ({
  responses: many(driverResponses),
}));

export const driverResponses = sqliteTable(
  'driver_responses',
  {
    driverId: integer('driver_id')
      .notNull()
      .references(() => drivers.id),
    rideRequestId: integer('ride_request_id').references(() => rideRequests.id),
    response: text('response', { enum: drivers_responses }),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  },
  t => ({
    pk: primaryKey({ columns: [t.driverId, t.rideRequestId] }),
  }),
);

export const driverResponsesRelations = relations(
  driverResponses,
  ({ one }) => ({
    driver: one(drivers, {
      fields: [driverResponses.driverId],
      references: [drivers.id],
      relationName: 'driver',
    }),
    rideRequest: one(rideRequests, {
      fields: [driverResponses.rideRequestId],
      references: [rideRequests.id],
      relationName: 'response',
    }),
  }),
);

export const rideRequests = sqliteTable('ride_requests', {
  id: integer('id').primaryKey().primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  status: text('status', { enum: request_status }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const rideRequestsRelations = relations(
  rideRequests,
  ({ many, one }) => ({
    responses: many(driverResponses),
    user: one(users, {
      fields: [rideRequests.userId],
      references: [users.id],
    }),
  }),
);
