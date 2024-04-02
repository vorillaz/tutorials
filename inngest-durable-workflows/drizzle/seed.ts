import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../src/db/schema';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

// seed with some data

(async () => {
  const now = Date.now();
  const oneHourAgo = 1000 * 60 * 60;
  // seed with some data
  await db
    .insert(schema.users)
    .values([
      { name: 'James', id: 1, createdAt: new Date(now - oneHourAgo * 20) },
      { name: 'Bob', id: 2, createdAt: new Date(now - oneHourAgo * 20) },
      { name: 'Morgan', id: 3, createdAt: new Date(now - oneHourAgo * 20) },
    ])
    .onConflictDoNothing()
    .returning();

  await db
    .insert(schema.drivers)
    .values([
      { name: 'Taylor', id: 11, createdAt: new Date(now - oneHourAgo * 20) },
      { name: 'Parker', id: 22, createdAt: new Date(now - oneHourAgo * 20) },
      { name: 'Logan', id: 33, createdAt: new Date(now - oneHourAgo * 20) },
    ])
    .onConflictDoNothing()
    .returning();

  // Create some requests
  await db
    .insert(schema.rideRequests)
    .values([
      {
        id: 1,
        userId: 1,
        status: schema.ride_status.timed_out,
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        status: schema.ride_status.timed_out,
        createdAt: new Date(),
      },
    ])
    .onConflictDoNothing()
    .returning();

  await db.transaction(async tx => {
    await tx
      .insert(schema.rideRequests)
      .values([
        {
          id: 3,
          userId: 1,
          status: schema.ride_status.accepted,
          createdAt: new Date(now - oneHourAgo),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();
    await tx
      .insert(schema.driverResponses)
      .values([
        {
          driverId: 33,
          rideRequestId: 3,
          response: schema.driver_response.accepted,
          createdAt: new Date(),
        },
        {
          driverId: 22,
          rideRequestId: 3,
          response: schema.driver_response.rejected,
          createdAt: new Date(now - oneHourAgo * 2),
        },
        {
          driverId: 11,
          rideRequestId: 3,
          response: schema.driver_response.rejected,
          createdAt: new Date(now - oneHourAgo * 3),
        },
      ])
      .onConflictDoNothing()
      .returning();
  });
})();
