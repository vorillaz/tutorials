import { FastifyPluginCallback } from 'fastify';
import logs from './logs';
import user from './user';
import driver from './driver';

const routes: FastifyPluginCallback = (server, opts, done) => {
  server.register(logs, {
    prefix: '/logs',
  });
  server.register(user, {
    prefix: '/user',
  });
  server.register(driver, {
    prefix: '/driver',
  });
  done();
};

export default routes;
