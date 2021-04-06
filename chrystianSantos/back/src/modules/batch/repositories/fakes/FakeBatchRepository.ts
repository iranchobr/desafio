import { ICreateBatchDTO } from '@modules/batch/dtos/ICreateBatchDTO';
import { Batch } from '@modules/batch/infra/typeorm/entities/Batch';
import { uuid } from 'uuidv4';
import { IBatchRepositories } from '../IBatchRepositories';

export class FakeBatchRepository implements IBatchRepositories {
  private arrBatch: Batch[] = [];

  async create({ name, description }: ICreateBatchDTO): Promise<Batch> {
    const batch = new Batch();
    Object.assign(batch, {
      name,
      description,
    });
    batch.id = uuid();
    return batch;
  }

  async save(data: Batch): Promise<Batch> {
    this.arrBatch.push(data);
    return this.arrBatch[this.arrBatch.length - 1];
  }

  async findNameBatch(name: string): Promise<Batch | undefined> {
    const batchExists = this.arrBatch.find(batch => batch.name === name);
    return batchExists;
  }

  async findAll(): Promise<Batch[]> {
    return this.arrBatch;
  }

  async findById(id: string): Promise<Batch | undefined> {
    const findById = this.arrBatch.find(batch => batch.id === id);
    return findById;
  }

  async delete(data: Batch): Promise<boolean> {
    const removeBatch = this.arrBatch.filter(batch => batch.id !== data.id);
    this.arrBatch = removeBatch;
    return true;
  }
}
