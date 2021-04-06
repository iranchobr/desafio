import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBatchRepositories } from '../repositories/IBatchRepositories';

@injectable()
export class DeleteBatchService {
  constructor(
    @inject('BatchRepository')
    private batchRepository: IBatchRepositories,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const findBatch = await this.batchRepository.findById(id);

    if (!findBatch) {
      throw new AppError('Lote não encontrado', 404);
    }

    await this.batchRepository.delete(findBatch);

    return true;
  }
}
