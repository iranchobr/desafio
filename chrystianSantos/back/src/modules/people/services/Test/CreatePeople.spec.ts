import AppError from '../../../../shared/errors/AppError';
import { FakePeopleRepository } from '../../repositories/fakes/FakePeopleRepository';
import { CreatePeopleService } from '../CreatePeopleService';

let fakePeopleRepository: FakePeopleRepository;
let createPeopleService: CreatePeopleService;
describe('CreatePeople', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    createPeopleService = new CreatePeopleService(fakePeopleRepository);
  });

  it('Should be able to create a new People', async () => {
    const people = await createPeopleService.execute({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com.br',
      endereco: 'Rua 27 numero 302 Iguatama-MG',
      sex: 'm',
    });

    expect(people).toHaveProperty('id');
    expect(people).toEqual({
      id: people.id,
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com.br',
      endereco: 'Rua 27 numero 302 Iguatama-MG',
      sex: 'm',
    });
  });
  it('Should be able to create a new People with duplicate email', async () => {
    await createPeopleService.execute({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com.br',
      endereco: 'Rua 27 numero 302 Iguatama-MG',
      sex: 'm',
    });

    await expect(
      createPeopleService.execute({
        name: 'Chrystian',
        active: true,
        email: 'chrystian@gmail.com.br',
        endereco: 'Rua 27 numero 302 Iguatama-MG',
        sex: 'm',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
