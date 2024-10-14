import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./ctx";

import playground from "./playground";
// Imports from trpc generator
import { appRouter } from "./trpc/routers";

const server = fastify({
  maxParamLength: 5000,
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      server.log.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<typeof appRouter>["trpcOptions"],
});

server.register(playground);

(async () => {
  try {
    await server.listen({ port: 3000 });
    server.log.info("Server is running on port 3000");

    server.log.info("Routes:");
    server.log.info(server.printRoutes());
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
