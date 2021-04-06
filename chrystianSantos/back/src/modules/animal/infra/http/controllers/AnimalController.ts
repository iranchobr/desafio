import { CreateAnimalService } from '@modules/animal/services/CreateAnimalService';
import { DeleteAnimalService } from '@modules/animal/services/DeleteAnimalService';
import { UpdateAnimalService } from '@modules/animal/services/UpdateAnimalService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ShowAnimalService } from '../../../services/ShowAnimalService';

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

  public async show(req: Request, res: Response): Promise<Response> {
    const showAnimalService = container.resolve(ShowAnimalService);
    const showAnimals = await showAnimalService.execute();
    return res.json(showAnimals);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, id_people, breed, sex, weigth, born } = req.body;
    const { id } = req.params;

    const updateAnimalService = container.resolve(UpdateAnimalService);
    const updateAnimal = await updateAnimalService.execute({
      id,
      name,
      id_people,
      breed,
      sex,
      weigth,
      born,
    });

    return res.json(classToClass(updateAnimal));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteAnimalService = container.resolve(DeleteAnimalService);
    const deleteAnimal = await deleteAnimalService.execute(id);
    return res.json(deleteAnimal);
  }
}
