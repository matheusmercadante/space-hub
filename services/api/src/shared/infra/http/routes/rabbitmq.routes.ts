import { Router } from 'express';
import RabbitmqServer from '@shared/infra/amqp/rabbitmq-server';

const rabbitmqRouter = Router();

rabbitmqRouter.post('/process-data', async (request, response) => {
  const server = new RabbitmqServer('amqp://guest:guest@localhost:5672');
  await server.start();

  const { file } = request.body;

  await server.publishInQueue('process-data-comming', JSON.stringify(file));
  // await server.publishInExchange(
  //   'processdata-rpc',
  //   'fe706e53-91a7-481d-8b1a-2e72adc2a87e',
  //   JSON.stringify(file),
  // );
});

export default rabbitmqRouter;
