import { IAnimalBatchRepositorie } from '@modules/animalBatch/repositories/IAnimalBatchRepository';
import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteAnimalBatchService {
  constructor(
    @inject('AnimalBatchRepository')
    private animalBatchRepository: IAnimalBatchRepositorie,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const findAnimalBatch = await this.animalBatchRepository.findById(id);

    if (!findAnimalBatch) {
      throw new AppError('Lote animal não encontrado', 404);
    }

    await this.animalBatchRepository.delete(findAnimalBatch);

    await this.redisCacheProvider.invalidate('animalsBatch');

    return true;
  }
}
