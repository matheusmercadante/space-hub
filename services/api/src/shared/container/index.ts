import { container } from 'tsyringe';

import './providers';

import IPackagesRepository from '@modules/packages/repositories/IPackagesRepository';
import PackagesRepository from '@modules/packages/infra/typeorm/repositories/PackagesRepository';

import IRepositoriesRepository from '@modules/packages/repositories/IRepositoriesRepository';
import RepositoriesRepository from '@modules/packages/infra/typeorm/repositories/RepositoriesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IPackagesRepository>(
  'PackagesRepository',
  PackagesRepository,
);

container.registerSingleton<IRepositoriesRepository>(
  'RepositoriesRepository',
  RepositoriesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
