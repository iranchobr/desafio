import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Batch } from '../infra/typeorm/entities/Batch';
import { IBatchRepositories } from '../repositories/IBatchRepositories';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
export class UpdateBatchService {
  constructor(
    @inject('BatchRepository')
    private batchRepository: IBatchRepositories,
  ) {}

  public async execute({ id, name, description }: IRequest): Promise<Batch> {
    const findBatch = await this.batchRepository.findById(id);

    if (!findBatch) {
      throw new AppError('Lote não encontrado', 404);
    }

    Object.assign(findBatch, {
      name,
      description,
    });

    const batchChanged = await this.batchRepository.save(findBatch);

    return batchChanged;
  }
}
