import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import * as schema from './schema';

const sqlite = new Database('./sqlite.db');
const db = drizzle(sqlite, { schema });

const drizzlePlugin: FastifyPluginAsync = async server => {
  server.decorate('db', db);
};

declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof drizzle<typeof schema>>;
  }
}

export { db, schema };
export default fp(drizzlePlugin);
