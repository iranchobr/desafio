import { container } from 'tsyringe';
import { IPeopleRepository } from '../repositories/IPeopleRepository';
import { PeopleRepository } from '../infra/typeorm/repositories/PeopleRepository';

container.registerSingleton<IPeopleRepository>(
  'PeopleRepository',
  PeopleRepository,
);
