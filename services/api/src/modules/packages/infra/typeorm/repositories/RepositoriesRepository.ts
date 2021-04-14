import { getRepository, Raw, Repository } from 'typeorm';

import RepositoryEntity from '@modules/packages/infra/typeorm/entities/Repository';
import IRepositoriesRepository from '@modules/packages/repositories/IRepositoriesRepository';

import FindAllInDayFromPackageDTO from '@modules/packages/dtos/IFindAllInDayFromPackageDTO';
import FindAllInMonthFromPackageDTO from '@modules/packages/dtos/IFindAllInMonthFromPackageDTO';
import ICreateRepositoryDTO from '@modules/packages/dtos/ICreateRepositoryDTO';

class RepositoriesRepository implements IRepositoriesRepository {
  private ormRepository: Repository<RepositoryEntity>;

  constructor() {
    this.ormRepository = getRepository(RepositoryEntity);
  }

  public async findByDate(
    date: Date,
    package_id: string,
  ): Promise<RepositoryEntity | undefined> {
    const findRepository = await this.ormRepository.findOne({
      where: { date, package_id },
    });

    return findRepository;
  }

  public async findAllInDayFromPackage({
    package_id,
    day,
    month,
    year,
  }: FindAllInDayFromPackageDTO): Promise<RepositoryEntity[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const repositories = await this.ormRepository.find({
      where: {
        package_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-'${parsedMonth}-${year}`,
        ),
      },
      relations: ['package'],
    });

    return repositories;
  }

  public async findAllInMonthFromPackage({
    package_id,
    month,
    year,
  }: FindAllInMonthFromPackageDTO): Promise<RepositoryEntity[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const repositories = await this.ormRepository.find({
      where: {
        package_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return repositories;
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
