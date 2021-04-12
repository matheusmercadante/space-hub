import Repository from '@modules/packages/infra/typeorm/entities/Repository'

import ICreateRepositoryDTO from '@modules/packages/dtos/ICreateRepositoryDTO';

export default interface RepositoriesRepository {
  create(data: ICreateRepositoryDTO): Promise<Repository>;
  findByName(name: string): Promise<Repository | undefined>;
}
