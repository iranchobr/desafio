import { getRepository, Repository } from 'typeorm';
import { ICreatePeople } from '../../../dtos/ICreatePeopleDTO';
import { IPeopleRepository } from '../../../repositories/IPeopleRepository';
import { People } from '../entities/People';

export class PeopleRepository implements IPeopleRepository {
  private ormRepository: Repository<People>;

  constructor() {
    this.ormRepository = getRepository(People);
  }

  async create(data: ICreatePeople): Promise<People> {
    const peopleCreate = this.ormRepository.create(data);
    return peopleCreate;
  }

  async save(data: People): Promise<People> {
    const peopleSave = await this.ormRepository.save(data);
    return peopleSave;
  }

  async delete(data: People): Promise<boolean> {
    await this.ormRepository.remove(data);
    return true;
  }

  async findByEmai(email: string): Promise<People | undefined> {
    const findByEmail = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return findByEmail;
  }

  async findAll(): Promise<People[]> {
    const findPeoples = await this.ormRepository.find();
    return findPeoples;
  }

  async findById(id: string): Promise<People | undefined> {
    const findById = await this.ormRepository.findOne(id);
    return findById;
  }
}
