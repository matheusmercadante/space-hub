import { getRepository, Repository } from 'typeorm'

import Package from '@modules/packages/infra/typeorm/entities/Package'
import IPackagesRepository from '@modules/packages/repositories/IPackagesRepository';
import ICreatePackageDTO from '@modules/packages/dtos/ICreatePackageDTO';

class PackagesRepository implements IPackagesRepository {
  private ormRepository: Repository<Package>;

  constructor() {
    this.ormRepository = getRepository(Package);
  }

  public async findById(id: string): Promise<Package | undefined> {
    const findPackage = await this.ormRepository.findOne(id)

    return findPackage ||  undefined;
  }

  public async findByName(name: string): Promise<Package | undefined> {
    const findPackage = await this.ormRepository.findOne({
      where: { name }
    })

    return findPackage || undefined;
  }

  public async create({ user_id, name }: ICreatePackageDTO): Promise<Package> {
    const packageCreated = this.ormRepository.create({
      user_id,
      name
    });

    await this.ormRepository.save(packageCreated);

    return packageCreated;
  }
}

export default PackagesRepository;
