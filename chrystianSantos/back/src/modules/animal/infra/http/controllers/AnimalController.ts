import { CreateAnimalService } from '@modules/animal/services/CreateAnimalService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AnimalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_people, breed, sex, name, weigth, born } = req.body;
    const createAnimalService = container.resolve(CreateAnimalService);
    const createAnimal = await createAnimalService.execute({
      id_people,
      breed,
      sex,
      name,
      weigth,
      born,
    });
    return res.json(classToClass(createAnimal));
  }
}
