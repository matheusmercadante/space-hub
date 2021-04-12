import Package from '@modules/packages/infra/typeorm/entities/Package'

import ICreatePackageDTO from '@modules/packages/dtos/ICreatePackageDTO';

export default interface PackagesRepository {
  create(data: ICreatePackageDTO): Promise<Package>;
  findById(id: string): Promise<Package | undefined>;
  findByName(name: string): Promise<Package | undefined>;
}
