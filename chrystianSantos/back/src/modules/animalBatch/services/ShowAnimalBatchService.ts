import { inject, injectable } from 'tsyringe';
import { AnimalBatch } from '../infra/typeorm/entities/AnimalBatch';
import { IAnimalBatchRepositorie } from '../repositories/IAnimalBatchRepository';
@injectable()
export class ShowAnimalBatchService {
  constructor(
    @inject('AnimalBatchRepository')
    private animalBatchRepository: IAnimalBatchRepositorie,
  ) {}

  public async execute(): Promise<AnimalBatch[]> {
    const findAnimalBatch = await this.animalBatchRepository.findAll();
    return findAnimalBatch;
  }
}
