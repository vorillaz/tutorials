import { FastifyPluginAsync } from 'fastify';
import Log from '../log';

const logs: FastifyPluginAsync = async server => {
  server.get('/stream', async function handler(request, reply) {
    const log = Log.getInstance();
    const messages = log.getMessages();

    const stream = reply.raw;
    stream.setHeader('Content-Type', 'text/event-stream');
    stream.setHeader('Cache-Control', 'no-cache');
    stream.setHeader('Connection', 'keep-alive');

    const callback = (message: string) => {
      stream.write(`data: ${message}\n\n`);
    };

    log.subscribe(callback);
    stream.on('close', () => {
      log.unsubscribe(callback);
    });

    stream.write(`data: ${messages.join('\n')}\n\n`);
  });

  server.get('/push', async function handler(request, reply) {
    const log = Log.getInstance();
    log.addMessage('This is a demo message for push');
    return { message: 'Pushed message' };
  });

  server.get('/', async function handler(request, reply) {
    return reply.sendFile('stream.html');
  });
};

export default logs;
