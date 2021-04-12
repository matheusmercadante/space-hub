import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PackagesController from '@modules/packages/infra/http/controllers/PackagesController';

const packagesRouter = Router();
const packagesController = new PackagesController();

packagesRouter.use(ensureAuthenticated);

// packagesRouter.get('/', packagesController.index);

packagesRouter.post('/', packagesController.create);

export default packagesRouter;
