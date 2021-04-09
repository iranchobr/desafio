import { ICacheProvider } from '@shared/container/provider/ChacheProvider/model/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { People } from '../infra/typeorm/entities/People';
import { IPeopleRepository } from '../repositories/IPeopleRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  endereco: string;
  sex: 'f' | 'm';
  active: boolean;
}

@injectable()
export class ChangePeopleSerice {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
    @inject('CacheProvider')
    private redisCacheProvider: ICacheProvider,
  ) {}

  public async execute({
    active,
    sex,
    endereco,
    email,
    name,
    id,
  }: IRequest): Promise<People> {
    const peopleFind = await this.peopleRepository.findById(id);

    if (!peopleFind) {
      throw new AppError('Pessoa não encontrado', 404);
    }

    Object.assign(peopleFind, {
      active,
      sex,
      endereco,
      email,
      name,
    });

    const peopleSaved = await this.peopleRepository.save(peopleFind);

    await this.redisCacheProvider.invalidate('people');

    return peopleSaved;
  }
}
