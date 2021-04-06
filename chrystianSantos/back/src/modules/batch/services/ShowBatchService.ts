import { inject, injectable } from 'tsyringe';
import { Batch } from '../infra/typeorm/entities/Batch';
import { IBatchRepositories } from '../repositories/IBatchRepositories';

@injectable()
export class ShowBatchService {
  constructor(
    @inject('BatchRepository')
    private batchRepository: IBatchRepositories,
  ) {}

  public async execute(): Promise<Batch[]> {
    const findBatch = await this.batchRepository.findAll();
    return findBatch;
  }
}
