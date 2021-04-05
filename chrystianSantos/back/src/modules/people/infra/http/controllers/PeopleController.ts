// import { classToClass } from 'class-transformer';
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

    return res.json(peopleCreate);
  }
}
