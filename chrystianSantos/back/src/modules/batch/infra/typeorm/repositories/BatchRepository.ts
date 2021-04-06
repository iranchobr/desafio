import { ICreateBatchDTO } from '@modules/batch/dtos/ICreateBatchDTO';
import { IBatchRepositories } from '@modules/batch/repositories/IBatchRepositories';
import { getRepository, Repository } from 'typeorm';
import { Batch } from '../entities/Batch';

export class BatchRepository implements IBatchRepositories {
  private ormRepository: Repository<Batch>;

  constructor() {
    this.ormRepository = getRepository(Batch);
  }

  async create(data: ICreateBatchDTO): Promise<Batch> {
    const createBatch = this.ormRepository.create(data);
    return createBatch;
  }

  async save(data: Batch): Promise<Batch> {
    const saveBatch = await this.ormRepository.save(data);
    return saveBatch;
  }

  async findNameBatch(name: string): Promise<Batch | undefined> {
    const findByName = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return findByName;
  }

  async findAll(): Promise<Batch[]> {
    const findBatch = await this.ormRepository.find();
    return findBatch;
  }

  async findById(id: string): Promise<Batch | undefined> {
    const findBatch = await this.ormRepository.findOne(id);
    return findBatch;
  }
}
