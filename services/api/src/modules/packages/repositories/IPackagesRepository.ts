import Package from '@modules/packages/infra/typeorm/entities/Package'

import IFindAllInDayFromUserDTO from '../dtos/IFindAllInDayFromUserDTO';
import IFindAllInMonthFromUserDTO from '../dtos/IFindAllInMonthFromUserDTO';
import ICreatePackageDTO from '@modules/packages/dtos/ICreatePackageDTO';

export default interface PackagesRepository {
  create(data: ICreatePackageDTO): Promise<Package>;
  findById(id: string): Promise<Package | undefined>;
  findByName(name: string): Promise<Package | undefined>;
  findByDate(date: Date, user_id: string): Promise<Package | undefined>;
  findAllInMonthFromUser(
    data: IFindAllInMonthFromUserDTO,
  ): Promise<Package[]>;
  findAllInDayFromUser(
    data: IFindAllInDayFromUserDTO,
  ): Promise<Package[]>;
}
