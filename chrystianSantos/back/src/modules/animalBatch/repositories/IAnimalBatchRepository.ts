import { ICreateAnimalBatchDTO } from '../dtos/ICreateAnimalBatchDTO';
import { AnimalBatch } from '../infra/typeorm/entities/AnimalBatch';

export interface IAnimalBatchRepositorie {
  create(data: ICreateAnimalBatchDTO): Promise<AnimalBatch>;
  save(data: AnimalBatch): Promise<AnimalBatch>;
  findAll(): Promise<AnimalBatch[]>;
  findById(id: string): Promise<AnimalBatch | undefined>;
  delete(data: AnimalBatch): Promise<boolean>;
}
