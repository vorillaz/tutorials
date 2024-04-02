import Fastify from 'fastify';
import config from './config';
import db from './db';
import inngest from './inngest/plugin';
import routes from './routes';
import fastifyStatic from '@fastify/static';
import path from 'path';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

fastify
  .register(config)
  .register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
  })
  .register(db)
  .register(inngest)
  .register(routes);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
