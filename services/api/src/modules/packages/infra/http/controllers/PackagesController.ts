import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreatePackageService from '@modules/packages/services/CreatePackageService';

export default class PackageController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const packagesRepository = container.resolve(CreatePackageService);

  //   const packages = await packagesRepository.find();

  //   return response.json(packages);
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const packagesRepository = container.resolve(CreatePackageService);

    const packageCreated = await packagesRepository.execute({
      user_id: request.user.id,
      name,
    });

    return response.json(packageCreated);
  }
}
