import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { AnimalBatch } from '../infra/typeorm/entities/AnimalBatch';
import { IAnimalBatchRepositorie } from '../repositories/IAnimalBatchRepository';
@injectable()
export class ShowAnimalBatchService {
  constructor(
    @inject('AnimalBatchRepository')
    private animalBatchRepository: IAnimalBatchRepositorie,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<AnimalBatch[]> {
    let findAnimalBatch = await this.redisCacheProvider.recovery<AnimalBatch[]>(
      'animalsBatch',
    );

    if (!findAnimalBatch) {
      findAnimalBatch = await this.animalBatchRepository.findAll();
      await this.redisCacheProvider.save(
        'animalsBatch',
        classToClass(findAnimalBatch),
      );
    }

    return findAnimalBatch;
  }
}
