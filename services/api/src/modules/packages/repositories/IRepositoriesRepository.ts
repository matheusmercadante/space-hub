import Repository from '@modules/packages/infra/typeorm/entities/Repository';

import FindAllInMonthFromPackageDTO from '@modules/packages/dtos/IFindAllInMonthFromPackageDTO';
import FindAllInDayFromPackageDTO from '@modules/packages/dtos/IFindAllInDayFromPackageDTO';
import ICreateRepositoryDTO from '@modules/packages/dtos/ICreateRepositoryDTO';

export default interface RepositoriesRepository {
  create(data: ICreateRepositoryDTO): Promise<Repository>;
  findByName(name: string): Promise<Repository | undefined>;
  findByDate(date: Date, package_id: string): Promise<Repository | undefined>;
  findAllInMonthFromPackage(
    data: FindAllInMonthFromPackageDTO,
  ): Promise<Repository[]>;
  findAllInDayFromPackage(
    data: FindAllInDayFromPackageDTO,
  ): Promise<Repository[]>;
}
