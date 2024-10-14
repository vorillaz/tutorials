import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, prisma };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
