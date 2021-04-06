import { inject, injectable } from 'tsyringe';
import { Animal } from '../infra/typeorm/entities/Animal';
import { IAnimalRepository } from '../repositories/IAnimalRepository';

@injectable()
export class ShowAnimalService {
  constructor(
    @inject('AnimalRepository')
    private animalRepository: IAnimalRepository,
  ) {}

  public async execute(): Promise<Animal[]> {
    const findAnimals = this.animalRepository.findAll();
    return findAnimals;
  }
}
