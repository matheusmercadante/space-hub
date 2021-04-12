import { getRepository, Repository } from 'typeorm';

import RepositoryEntity from '@modules/packages/infra/typeorm/entities/Repository';
import IRepositoriesRepository from '@modules/packages/repositories/IRepositoriesRepository';
import ICreateRepositoryDTO from '@modules/packages/dtos/ICreateRepositoryDTO';

class RepositoriesRepository implements IRepositoriesRepository {
  private ormRepository: Repository<RepositoryEntity>;

  constructor() {
    this.ormRepository = getRepository(RepositoryEntity);
  }

  public async findByName(name: string): Promise<RepositoryEntity | undefined> {
    const findRepository = await this.ormRepository.findOne({
      where: { name },
    });

    return findRepository || undefined;
  }

  public async create({
    user_id,
    package_id,
    name,
    file,
  }: ICreateRepositoryDTO): Promise<RepositoryEntity> {
    const repository = this.ormRepository.create({
      user_id,
      package_id,
      name,
      file,
    });

    await this.ormRepository.save(repository);

    return repository;
  }
}

export default RepositoriesRepository;
