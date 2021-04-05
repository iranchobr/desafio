import { uuid } from 'uuidv4';
import { ICreatePeople } from '../../dtos/ICreatePeopleDTO';
import { People } from '../../infra/typeorm/entities/People';
import { IPeopleRepository } from '../IPeopleRepository';

export class FakePeopleRepository implements IPeopleRepository {
  private arrPeople: People[] = [];

  async create(data: ICreatePeople): Promise<People> {
    const newPeople = new People();
    Object.assign(newPeople, data);
    newPeople.id = uuid();
    this.arrPeople.push(newPeople);
    return newPeople;
  }

  async delete(data: People): Promise<boolean> {
    const arrPeople = this.arrPeople.filter(people => people.id !== data.id);
    this.arrPeople = arrPeople;
    return true;
  }

  async save(data: People): Promise<People> {
    this.arrPeople.push(data);
    return this.arrPeople[this.arrPeople.length - 1];
  }

  async findByEmai(email: string): Promise<People | undefined> {
    const findPeople = this.arrPeople.find(people => people.email === email);
    return findPeople;
  }

  async findAll(): Promise<People[]> {
    return this.arrPeople;
  }

  async findById(id: string): Promise<People | undefined> {
    const findPeople = this.arrPeople.find(people => people.id === id);
    return findPeople;
  }
}
