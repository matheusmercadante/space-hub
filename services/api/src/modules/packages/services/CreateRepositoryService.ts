import { injectable, inject } from 'tsyringe';

import Repository from '@modules/packages/infra/typeorm/entities/Repository';
import IRepositoriesRepository from '@modules/packages/repositories/IRepositoriesRepository';
import IPackagesRepository from '@modules/packages/repositories/IPackagesRepository';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  package_id: string;
  name: string;
  file: string;
}

@injectable()
class CreateRepositoryService {
  constructor(
    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,
    @inject('PackagesRepository')
    private packagesRepository: IPackagesRepository,
  ) {}

  public async execute({
    user_id,
    package_id,
    name,
    file,
  }: Request): Promise<Repository> {
    const packageSearched = await this.packagesRepository.findById(package_id);

    if (!packageSearched) {
      throw new AppError('Package not found');
    }

    const findRepositoryInSameName = await this.repositoriesRepository.findByName(
      name,
    );

    if (findRepositoryInSameName) {
      throw new AppError('This repository is already named');
    }

    const packageInstance = await this.repositoriesRepository.create({
      user_id,
      package_id,
      name,
      file,
    });

    return packageInstance;
  }
}

export default CreateRepositoryService;
