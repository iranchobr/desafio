// import { classToClass } from 'class-transformer';
import { GetPeopleService } from '@modules/people/services/GetPeopleService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePeopleService } from '../../../services/CreatePeopleService';

export class PeopleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, active, email, endereco, sex } = req.body;
    const peopleService = container.resolve(CreatePeopleService);
    const peopleCreate = await peopleService.execute({
      name,
      active,
      email,
      endereco,
      sex,
    });

    return res.json(classToClass(peopleCreate));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const getPeopleService = container.resolve(GetPeopleService);
    const getPeople = await getPeopleService.execute();

    return res.json(classToClass(getPeople));
  }
}
