import fp from "fastify-plugin";
import { getFastifyPlugin } from "trpc-playground/handlers/fastify";

import { appRouter } from "./trpc/routers";

export default fp(async function (server) {
  const playgroundPlugin = await getFastifyPlugin({
    trpcApiEndpoint: "/trpc",
    playgroundEndpoint: "/playground",
    router: appRouter,
    renderOptions: {
      version: "1.0.4",
    },
  });
  await server.register(playgroundPlugin, { prefix: "/playground" });
});
