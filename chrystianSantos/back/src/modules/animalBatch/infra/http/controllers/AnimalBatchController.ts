import { CreateAnimalBatchService } from '@modules/animalBatch/services/CreateAnimalBatchService';
import { DeleteAnimalBatchService } from '@modules/animalBatch/services/DeleteAnimalBatchService';
import { ShowAnimalBatchService } from '@modules/animalBatch/services/ShowAnimalBatchService';
import { UpdateAnimalBatchService } from '@modules/animalBatch/services/UpdateAnimalBatchService';
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

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteAnimalBatchService = container.resolve(
      DeleteAnimalBatchService,
    );

    const deleteAnimalBatch = await deleteAnimalBatchService.execute(id);

    return res.json(deleteAnimalBatch);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id_batch, id_animal, dt_entry, dt_exit, calf } = req.body;

    const updateAnimalBatchService = container.resolve(
      UpdateAnimalBatchService,
    );

    const updateAnimalBatch = await updateAnimalBatchService.execute({
      id,
      id_animal,
      id_batch,
      calf,
      dt_exit,
      dt_entry,
    });

    return res.json(classToClass(updateAnimalBatch));
  }
}
