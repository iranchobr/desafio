import { ICreatePeople } from '../dtos/ICreatePeopleDTO';
import { People } from '../infra/typeorm/entities/People';

export interface IPeopleRepository {
  create(data: ICreatePeople): Promise<People>;
  save(data: People): Promise<People>;
  delete(data: People): Promise<People>;
  findByEmai(email: string): Promise<People | undefined>;
  findAll(): Promise<People[]>;
  findById(id: string): Promise<People | undefined>;
}
