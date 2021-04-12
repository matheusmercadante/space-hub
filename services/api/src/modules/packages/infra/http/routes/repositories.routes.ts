import { Router } from 'express';

import RepositoriesController from '@modules/packages/infra/http/controllers/RepositoriesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const repositoriesRouter = Router();
const repositoriesController = new RepositoriesController();

repositoriesRouter.use(ensureAuthenticated);

// repositoriesRouter.get('/', async (request, response) => {
//   const packagesRepository = getCustomRepository(RepositoriesRepository);
//   const packages = await packagesRepository.find();

//   return response.json(packages);
// });

repositoriesRouter.post('/', repositoriesController.create);

export default repositoriesRouter;
