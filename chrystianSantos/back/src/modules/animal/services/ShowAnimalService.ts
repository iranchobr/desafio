import animalBatchRoutes from '@modules/animalBatch/infra/http/routes/animalBatch.routes';
import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Animal } from '../infra/typeorm/entities/Animal';
import { IAnimalRepository } from '../repositories/IAnimalRepository';

@injectable()
export class ShowAnimalService {
  constructor(
    @inject('AnimalRepository')
    private animalRepository: IAnimalRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Animal[]> {
    let findAnimals = await this.redisCacheProvider.recovery<Animal[]>(
      'animals',
    );

    if (!findAnimals) {
      findAnimals = await this.animalRepository.findAll();
      await this.redisCacheProvider.save('animals', classToClass(findAnimals));
    }

    return findAnimals;
  }
}
