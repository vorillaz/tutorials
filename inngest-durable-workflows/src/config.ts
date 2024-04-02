import { FastifyPluginAsync } from 'fastify';

import swagger from '@fastify/swagger';
import ui from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import print from 'fastify-print-routes';

import { writeFile } from './utils';

let i = 0;
const config: FastifyPluginAsync = async server => {
  const now = Date.now();
  server.setGenReqId(req => `${now}-${i++}`);
  await server.register(print);
  await server.register(swagger, {
    openapi: {
      info: {
        title: 'Open Api taxi definitoion',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Development server',
        },
      ],
    },
  });

  await server.register(ui, {});

  if (process.env.NODE_ENV === 'development') {
    const specFile = './openapi/data-api.json';
    server.ready(() => {
      const apiSpec = JSON.stringify(server.swagger() || {}, null, 2);
      writeFile(specFile, apiSpec).then(() => {
        console.log(`Swagger specification file write to ${specFile}`);
      });
    });
  }
};

export default fp(config);
