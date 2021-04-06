import { ICreateBatchDTO } from '../dtos/ICreateBatchDTO';
import { Batch } from '../infra/typeorm/entities/Batch';

export interface IBatchRepositories {
  create(data: ICreateBatchDTO): Promise<Batch>;
  save(data: Batch): Promise<Batch>;
  findNameBatch(name: string): Promise<Batch | undefined>;
  findAll(): Promise<Batch[]>;
}
