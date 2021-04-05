import { inject, injectable } from 'tsyringe';
import { People } from '../infra/typeorm/entities/People';
import { IPeopleRepository } from '../repositories/IPeopleRepository';

@injectable()
export class GetPeopleService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute(): Promise<People[]> {
    const findPeople = this.peopleRepository.findAll();
    return findPeople;
  }
}
