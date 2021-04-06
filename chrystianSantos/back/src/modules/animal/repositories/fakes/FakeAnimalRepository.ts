import { ICreateAnimalDTO } from '@modules/animal/dtos/ICreateAnimalDTO';
import { Animal } from '@modules/animal/infra/typeorm/entities/Animal';
import { uuid } from 'uuidv4';
import { IAnimalRepository } from '../IAnimalRepository';

export class FakeAnimalRepository implements IAnimalRepository {
  private arrAnimal: Animal[] = [];

  async create(data: ICreateAnimalDTO): Promise<Animal> {
    const animal = new Animal();
    Object.assign(animal, data);
    animal.id = uuid();
    return animal;
  }

  async save(data: Animal): Promise<Animal> {
    this.arrAnimal.push(data);
    return this.arrAnimal[this.arrAnimal.length - 1];
  }

  async findAll(): Promise<Animal[]> {
    return this.arrAnimal;
  }

  async findById(id: string): Promise<Animal | undefined> {
    const findAnimal = this.arrAnimal.find(animal => animal.id === id);
    return findAnimal;
  }

  async delete(data: Animal): Promise<boolean> {
    const arrAnimalRemoved = this.arrAnimal.filter(
      animal => animal.id !== data.id,
    );
    this.arrAnimal = arrAnimalRemoved;
    return true;
  }
}
