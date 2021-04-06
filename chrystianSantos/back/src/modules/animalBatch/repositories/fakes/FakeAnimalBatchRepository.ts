import { AnimalBatch } from '@modules/animalBatch/infra/typeorm/entities/AnimalBatch';
import { uuid } from 'uuidv4';
import { IAnimalBatchRepositorie } from '../IAnimalBatchRepository';
import { ICreateAnimalBatchDTO } from '../../dtos/ICreateAnimalBatchDTO';

export class FakeAnimalBatchRepository implements IAnimalBatchRepositorie {
  private arrAnimalBatchRepository: AnimalBatch[] = [];

  async create({
    dt_entry,
    dt_exit,
    calf,
    id_batch,
    id_animal,
  }: ICreateAnimalBatchDTO): Promise<AnimalBatch> {
    const createAnimalBatch = new AnimalBatch();
    createAnimalBatch.id = uuid();
    Object.assign(createAnimalBatch, {
      dt_entry,
      dt_exit,
      calf,
      id_batch,
      id_animal,
    });
    return createAnimalBatch;
  }

  async save(data: AnimalBatch): Promise<AnimalBatch> {
    this.arrAnimalBatchRepository.push(data);
    return this.arrAnimalBatchRepository[
      this.arrAnimalBatchRepository.length - 1
    ];
  }
}
