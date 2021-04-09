import { ICreateAnimalBatchDTO } from '@modules/animalBatch/dtos/ICreateAnimalBatchDTO';
import { IAnimalBatchRepositorie } from '@modules/animalBatch/repositories/IAnimalBatchRepository';
import { getRepository, Repository } from 'typeorm';
import { AnimalBatch } from '../entities/AnimalBatch';

export class AnimalBatchRepository implements IAnimalBatchRepositorie {
  private ormRepository: Repository<AnimalBatch>;

  constructor() {
    this.ormRepository = getRepository(AnimalBatch);
  }

  async create(data: ICreateAnimalBatchDTO): Promise<AnimalBatch> {
    const createAnimalBatch = this.ormRepository.create(data);
    return createAnimalBatch;
  }

  async save(data: AnimalBatch): Promise<AnimalBatch> {
    const saveAnimalBatch = await this.ormRepository.save(data);
    return saveAnimalBatch;
  }

  async findAll(): Promise<AnimalBatch[]> {
    const findAnimalBatch = await this.ormRepository.find({
      relations: ['animal', 'batch'],
    });
    return findAnimalBatch;
  }

  async findById(id: string): Promise<AnimalBatch | undefined> {
    const findAnimalBatch = await this.ormRepository.findOne(id);
    return findAnimalBatch;
  }

  async delete(data: AnimalBatch): Promise<boolean> {
    await this.ormRepository.remove(data);
    return true;
  }
}
