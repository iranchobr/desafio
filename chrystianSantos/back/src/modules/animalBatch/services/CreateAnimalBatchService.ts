import { IAnimalRepository } from '@modules/animal/repositories/IAnimalRepository';
import { IBatchRepositories } from '@modules/batch/repositories/IBatchRepositories';
import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateAnimalBatchDTO } from '../dtos/ICreateAnimalBatchDTO';
import { AnimalBatch } from '../infra/typeorm/entities/AnimalBatch';
import { IAnimalBatchRepositorie } from '../repositories/IAnimalBatchRepository';

@injectable()
export class CreateAnimalBatchService {
  constructor(
    @inject('AnimalBatchRepository')
    private animalBatchRepository: IAnimalBatchRepositorie,
    @inject('BatchRepository')
    private batchRepository: IBatchRepositories,
    @inject('AnimalRepository')
    private animalRepository: IAnimalRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreateAnimalBatchDTO): Promise<AnimalBatch> {
    const [batchExists, animalExists] = await Promise.all([
      this.batchRepository.findById(data.id_batch),
      this.animalRepository.findById(data.id_animal),
    ]);

    if (!batchExists) {
      throw new AppError('Lote não encontrado', 404);
    }

    if (!animalExists) {
      throw new AppError('Animal não encontrado', 404);
    }

    const createAnimalBatch = await this.animalBatchRepository.create(data);
    const animalBatchSave = await this.animalBatchRepository.save(
      createAnimalBatch,
    );

    await this.redisCacheProvider.invalidate('animalsBatch');

    return animalBatchSave;
  }
}
