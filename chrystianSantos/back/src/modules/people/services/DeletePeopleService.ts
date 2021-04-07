import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { People } from '../infra/typeorm/entities/People';
import { IPeopleRepository } from '../repositories/IPeopleRepository';

@injectable()
export class DeletePeopleService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const findPeople = await this.peopleRepository.findById(id);

    if (!findPeople) {
      throw new AppError('Pessoa não encontrado', 404);
    }
    await this.peopleRepository.delete(findPeople);
    await this.redisCacheProvider.invalidate('people');
    return true;
  }
}
