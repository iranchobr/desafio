import { container } from 'tsyringe';
import { IBatchRepositories } from '../repositories/IBatchRepositories';
import { BatchRepository } from '../infra/typeorm/repositories/BatchRepository';

container.registerSingleton<IBatchRepositories>(
  'BatchRepository',
  BatchRepository,
);
