import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { Batch } from '../infra/typeorm/entities/Batch';
import { IBatchRepositories } from '../repositories/IBatchRepositories';

@injectable()
export class ShowBatchService {
  constructor(
    @inject('BatchRepository')
    private batchRepository: IBatchRepositories,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Batch[]> {
    let findBatch = await this.redisCacheProvider.recovery<Batch[]>('batch');
    if (!findBatch) {
      findBatch = await this.batchRepository.findAll();
      await this.redisCacheProvider.save('batch', findBatch);
    }
    return findBatch;
  }
}
