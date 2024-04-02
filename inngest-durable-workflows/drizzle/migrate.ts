import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const migrationsFolder = path.resolve(__dirname);

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder });
