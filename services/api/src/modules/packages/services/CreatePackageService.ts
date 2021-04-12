import { injectable, inject } from 'tsyringe';

import Package from '@modules/packages/infra/typeorm/entities/Package';
import IPackagesRepository from '@modules/packages/repositories/IPackagesRepository';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  name: string;
}

@injectable()
class CreatePackageService {
  constructor(
    @inject('PackagesRepository')
    private packagesRepository: IPackagesRepository,
  ) {}

  public async execute({ name, user_id }: Request): Promise<Package> {
    const findPackageInSameName = await this.packagesRepository.findByName(
      name,
    );

    if (findPackageInSameName) {
      throw new AppError('This package is already named');
    }

    const packageCreated = await this.packagesRepository.create({
      user_id,
      name,
    });

    return packageCreated;
  }
}

export default CreatePackageService;
