import { CreateAnimalBatchService } from '@modules/animalBatch/services/CreateAnimalBatchService';
import { ShowAnimalBatchService } from '@modules/animalBatch/services/ShowAnimalBatchService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AnimalBatchController {
  async create(req: Request, res: Response): Promise<Response> {
    const { id_batch, id_animal, dt_entry, dt_exit, calf } = req.body;
    const createAnimalBatchService = container.resolve(
      CreateAnimalBatchService,
    );

    const createAnimalBatch = await createAnimalBatchService.execute({
      id_batch,
      id_animal,
      dt_entry,
      dt_exit,
      calf,
    });

    return res.json(classToClass(createAnimalBatch));
  }

  async show(req: Request, res: Response): Promise<Response> {
    const showAnimalBatchService = container.resolve(ShowAnimalBatchService);
    const showAnimal = await showAnimalBatchService.execute();
    return res.json(classToClass(showAnimal));
  }
}
