import { ICreateAnimalDTO } from '@modules/animal/dtos/ICreateAnimalDTO';
import { Animal } from '../infra/typeorm/entities/Animal';

export interface IAnimalRepository {
  create(data: ICreateAnimalDTO): Promise<Animal>;
  save(data: Animal): Promise<Animal>;
  findAll(): Promise<Animal[]>;
  findById(id: string): Promise<Animal | undefined>;
}
