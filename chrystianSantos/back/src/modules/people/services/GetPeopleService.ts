import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import { People } from '../infra/typeorm/entities/People';
import { IPeopleRepository } from '../repositories/IPeopleRepository';

@injectable()
export class GetPeopleService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<People[]> {
    let findPeople = await this.redisCacheProvider.recovery<People[]>('people');

    if (!findPeople) {
      findPeople = await this.peopleRepository.findAll();
      await this.redisCacheProvider.save('people', findPeople);
    }

    return findPeople;
  }
}
