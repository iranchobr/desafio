import { People } from '@modules/people/infra/typeorm/entities/People';
import AppError from '../../../../shared/errors/AppError';
import { FakePeopleRepository } from '../../repositories/fakes/FakePeopleRepository';
import { GetPeopleService } from '../GetPeopleService';

let fakePeopleRepository: FakePeopleRepository;
let getPeopleService: GetPeopleService;
describe('GetPeople', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    getPeopleService = new GetPeopleService(fakePeopleRepository);
  });

  it('Should be able to list people', async () => {
    const people1 = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27 numero 302',
      sex: 'm',
    });
    const people2 = await fakePeopleRepository.create({
      name: 'Livia',
      active: true,
      email: 'livia@gmail.com',
      endereco: 'Rua 27 numero 302',
      sex: 'f',
    });
    const peoples = await getPeopleService.execute();

    expect(peoples).toEqual([people1, people2]);
  });
});
