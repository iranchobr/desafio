import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Animal } from '../infra/typeorm/entities/Animal';
import { IAnimalRepository } from '../repositories/IAnimalRepository';

interface IUpdateAnimalService {
  id: string;
  id_people: string;
  name: string;
  breed: string;
  sex: 'f' | 'm';
  weigth: number;
  born: Date;
}

@injectable()
export class UpdateAnimalService {
  constructor(
    @inject('AnimalRepository')
    private animalRepository: IAnimalRepository,
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({
    born,
    weigth,
    sex,
    name,
    id_people,
    breed,
    id,
  }: IUpdateAnimalService): Promise<Animal> {
    const peopleExists = await this.peopleRepository.findById(id_people);

    if (!peopleExists) {
      throw new AppError('Pessoa não encontrada', 404);
    }

    if (!peopleExists.active) {
      throw new AppError('Pessoa não esta ativa', 401);
    }

    const findAnimal = await this.animalRepository.findById(id);

    if (!findAnimal) {
      throw new AppError('Animal não encontrada', 404);
    }
    Object.assign(findAnimal, {
      born,
      weigth,
      sex,
      name,
      id_people,
      breed,
    });
    const animalUpdate = await this.animalRepository.save(findAnimal);
    return animalUpdate;
  }
}
