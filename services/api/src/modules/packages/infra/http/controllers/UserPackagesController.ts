import { Request, Response } from 'express'
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe'

import ListUserPackagesService from '@modules/packages/services/ListUserPackagesService';

export default class UserPackagesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listUserPackages = container.resolve(ListUserPackagesService)

    const packages = await listUserPackages.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return response.json(classToClass(packages));
  }
}
