import { container } from 'tsyringe';
import { IAnimalRepository } from '../repositories/IAnimalRepository';
import { AnimalRepository } from '../infra/typeorm/repositories/AnimalRepository';

container.registerSingleton<IAnimalRepository>(
  'AnimalRepository',
  AnimalRepository,
);
