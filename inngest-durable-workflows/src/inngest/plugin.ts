import inngestFastify from 'inngest/fastify';
import { FastifyPluginAsync } from 'fastify';
import { functions, inngest } from './fns';
import fp from 'fastify-plugin';

export const innPlugin: FastifyPluginAsync = async server => {
  server.register(inngestFastify, {
    client: inngest,
    functions,
    options: {},
  });
  //   decorate the server with the inngest client
  server.decorate('inngest', inngest);
};

export default fp(innPlugin);

declare module 'fastify' {
  interface FastifyInstance {
    inngest: typeof inngest;
  }
}
