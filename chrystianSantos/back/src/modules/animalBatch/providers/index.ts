import { container } from 'tsyringe';
import { IAnimalBatchRepositorie } from '../repositories/IAnimalBatchRepository';
import { AnimalBatchRepository } from '../infra/typeorm/repositories/AnimalBatchRepositorie';

container.registerSingleton<IAnimalBatchRepositorie>(
  'AnimalBatchRepository',
  AnimalBatchRepository,
);
