import { IPeopleRepository } from '@modules/people/repositories/IPeopleRepository';
import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateAnimalDTO } from '../dtos/ICreateAnimalDTO';
import { Animal } from '../infra/typeorm/entities/Animal';
import { IAnimalRepository } from '../repositories/IAnimalRepository';

@injectable()
export class CreateAnimalService {
  constructor(
    @inject('AnimalRepository')
    private animalRepository: IAnimalRepository,
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute({
    born,
    id_people,
    breed,
    sex,
    name,
    weigth,
  }: ICreateAnimalDTO): Promise<Animal> {
    const findPeople = await this.peopleRepository.findById(id_people);

    if (!findPeople) {
      throw new AppError('Pessoa não encontrada', 404);
    }

    if (!findPeople.active) {
      throw new AppError('Pessoa desativada', 401);
    }

    const animalCreate = await this.animalRepository.create({
      born,
      weigth,
      name,
      sex,
      breed,
      id_people,
    });

    const animalSave = await this.animalRepository.save(animalCreate);

    await this.redisCacheProvider.invalidate('animals');

    return animalSave;
  }
}
