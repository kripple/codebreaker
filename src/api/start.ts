import { routes } from '@/api/routes';
import { server } from '@/api/server';

routes.map((handler) => {
  handler(server);
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    server.log.info(`Server listening on port ${port}.`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
