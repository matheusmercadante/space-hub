import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PackagesController from '@modules/packages/infra/http/controllers/PackagesController';
import UserPackagesController from '@modules/packages/infra/http/controllers/UserPackagesController';

const packagesRouter = Router();
const packagesController = new PackagesController();
const userPackagesController = new UserPackagesController();

packagesRouter.use(ensureAuthenticated);

packagesRouter.get('/me', userPackagesController.index);
packagesRouter.post('/', packagesController.create);

export default packagesRouter;
