import { Router } from 'express';

import packagesRouter from '@modules/packages/infra/http/routes/packages.routes';
import repositoriesRouter from '@modules/packages/infra/http/routes/repositories.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import rabbitmqRouter from './rabbitmq.routes';

const routes = Router();

routes.use('/packages', packagesRouter);
routes.use('/repositories', repositoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/rabbitmq', rabbitmqRouter);

export default routes;
