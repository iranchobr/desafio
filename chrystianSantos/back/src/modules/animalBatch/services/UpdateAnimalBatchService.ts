import { IAnimalRepository } from '@modules/animal/repositories/IAnimalRepository';
import { IBatchRepositories } from '@modules/batch/repositories/IBatchRepositories';
import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { AnimalBatch } from '../infra/typeorm/entities/AnimalBatch';
import { IAnimalBatchRepositorie } from '../repositories/IAnimalBatchRepository';

interface IAnimalBatch {
  id: string;
  id_batch: string;
  id_animal: string;
  dt_entry: Date;
  dt_exit: Date;
  calf: boolean;
}

@injectable()
export class UpdateAnimalBatchService {
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

  public async execute({
    id,
    id_batch,
    id_animal,
    dt_entry,
    dt_exit,
    calf,
  }: IAnimalBatch): Promise<AnimalBatch> {
    const findAnimalBatch = await this.animalBatchRepository.findById(id);

    if (!findAnimalBatch) {
      throw new AppError('Animal lote não encontrado');
    }

    const findBatchId = await this.batchRepository.findById(id_batch);

    if (!findBatchId) {
      throw new AppError('Lote não encontrado');
    }

    const findAnimalId = await this.animalRepository.findById(id_animal);

    if (!findAnimalId) {
      throw new AppError('Animal não encontrado');
    }

    Object.assign(findAnimalBatch, {
      id_batch,
      id_animal,
      dt_entry,
      dt_exit,
      calf,
      dt_last_movement: new Date(),
    });

    const animalBatch = await this.animalBatchRepository.save(findAnimalBatch);

    await this.redisCacheProvider.invalidate('animalsBatch');

    return animalBatch;
  }
}
