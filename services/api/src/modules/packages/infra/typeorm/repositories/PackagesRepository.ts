import { getRepository, Raw, Repository } from 'typeorm'

import Package from '@modules/packages/infra/typeorm/entities/Package'
import IPackagesRepository from '@modules/packages/repositories/IPackagesRepository';

import ICreatePackageDTO from '@modules/packages/dtos/ICreatePackageDTO';
import IFindAllInDayFromUserDTO from '@modules/packages/dtos/IFindAllInDayFromUserDTO';
import IFindAllInMonthFromUserDTO from '@modules/packages/dtos/IFindAllInMonthFromUserDTO';

class PackagesRepository implements IPackagesRepository {
  private ormRepository: Repository<Package>;

  constructor() {
    this.ormRepository = getRepository(Package);
  }

  public async findById(id: string): Promise<Package | undefined> {
    const findPackage = await this.ormRepository.findOne(id)

    return findPackage ||  undefined;
  }

  public async findByDate(
    created_at: Date,
    user_id: string,
  ): Promise<Package | undefined> {
    const findPackage = await this.ormRepository.findOne({
      where: { created_at, user_id },
    });

    return findPackage;
  }

  public async findAllInDayFromUser({
    user_id,
    day,
    month,
    year,
  }: IFindAllInDayFromUserDTO): Promise<Package[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const packages = await this.ormRepository.find({
      where: {
        user_id,
        created_at: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user']
    });

    return packages;
  }

  public async findAllInMonthFromUser({
    user_id,
    month,
    year,
  }: IFindAllInMonthFromUserDTO): Promise<Package[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const packages = await this.ormRepository.find({
      where: {
        user_id,
        created_at: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return packages;
  }

  public async findByName(name: string): Promise<Package | undefined> {
    const findPackage = await this.ormRepository.findOne({
      where: { name }
    })

    return findPackage || undefined;
  }

  public async create({ user_id, name }: ICreatePackageDTO): Promise<Package> {
    const createPackage = this.ormRepository.create({
      user_id,
      name
    });

    await this.ormRepository.save(createPackage);

    return createPackage;
  }
}

export default PackagesRepository;
