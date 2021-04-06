import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateBatchDTO } from '../dtos/ICreateBatchDTO';
import { Batch } from '../infra/typeorm/entities/Batch';
import { IBatchRepositories } from '../repositories/IBatchRepositories';

@injectable()
export class CreateBatchService {
  constructor(
    @inject('BatchRepository')
    private batchRepository: IBatchRepositories,
  ) {}

  public async execute({ name, description }: ICreateBatchDTO): Promise<Batch> {
    const findNameBatch = await this.batchRepository.findNameBatch(name);

    if (findNameBatch) {
      throw new AppError('Lote cadastrado', 401);
    }

    const createBatch = await this.batchRepository.create({
      name,
      description,
    });

    const batchSave = await this.batchRepository.save(createBatch);
    return batchSave;
  }
}
