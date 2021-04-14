import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Package from '../infra/typeorm/entities/Package';
import PackagesRepository from '../infra/typeorm/repositories/PackagesRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListUserPackagesService {
  constructor(
    @inject('PackagesRepository')
    private packagesRepository: PackagesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: Request): Promise<Package[]> {
    const cacheKey = `user-packages:${user_id}:${year}-${month}-${day}`;

    let packages = await this.cacheProvider.recover<Package[]>(
      cacheKey,
    );

    if (!packages) {
      packages = await this.packagesRepository.findAllInDayFromUser({
        user_id,
        day,
        month,
        year,
      });

      await this.cacheProvider.save(cacheKey, classToClass(packages));
    }

    return packages;
  }
}

export default ListUserPackagesService;
