import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreatePeople } from '../dtos/ICreatePeopleDTO';
import { People } from '../infra/typeorm/entities/People';
import { IPeopleRepository } from '../repositories/IPeopleRepository';

@injectable()
export class CreatePeopleService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(data: ICreatePeople): Promise<People> {
    const emailExist = await this.peopleRepository.findByEmai(data.email);

    if (emailExist) {
      throw new AppError('Email ja cadastrado', 401);
    }

    const createPeople = await this.peopleRepository.create(data);
    const peopleSaved = await this.peopleRepository.save(createPeople);
    await this.redisCacheProvider.invalidate('people');

    return peopleSaved;
  }
}
