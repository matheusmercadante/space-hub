import { Request, Response } from 'express'
import { hash } from 'bcryptjs';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = container.resolve(CreateUserService);

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.execute({
      name,
      email,
      password: hashedPassword,
    });

    return response.json(classToClass(user));
  }
}
