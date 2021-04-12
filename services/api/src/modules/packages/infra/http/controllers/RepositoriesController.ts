import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateRepositoryService from '@modules/packages/services/CreateRepositoryService';

export default class RepositoriesController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const packagesRepository = container.resolve(CreatePackageService);

  //   const packages = await packagesRepository.find();

  //   return response.json(packages);
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const { package_id, name, file } = request.body;

    const repositoriesRepository = container.resolve(CreateRepositoryService);

    const repository = await repositoriesRepository.execute({
      user_id: request.user.id,
      package_id,
      name,
      file,
    });

    return response.json(repository);
  }
}
