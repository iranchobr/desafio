import { ICreateAnimalDTO } from '@modules/animal/dtos/ICreateAnimalDTO';
import { IAnimalRepository } from '@modules/animal/repositories/IAnimalRepository';
import { getRepository, Repository } from 'typeorm';
import { Animal } from '../entities/Animal';

export class AnimalRepository implements IAnimalRepository {
  private ormRepository: Repository<Animal>;

  constructor() {
    this.ormRepository = getRepository(Animal);
  }

  async create(data: ICreateAnimalDTO): Promise<Animal> {
    const createAnimal = this.ormRepository.create(data);
    return createAnimal;
  }

  async save(data: Animal): Promise<Animal> {
    const animalSave = await this.ormRepository.save(data);
    return animalSave;
  }

  async findAll(): Promise<Animal[]> {
    const findAnimals = await this.ormRepository.find({
      relations: ['people'],
    });
    return findAnimals;
  }
}
