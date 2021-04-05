import { FakePeopleRepository } from '@modules/people/repositories/fakes/FakePeopleRepository';
import AppError from '@shared/errors/AppError';
import { ChangePeopleSerice } from '../ChangePeopleService';

let fakePeopleRepository: FakePeopleRepository;
let changePeopleService: ChangePeopleSerice;
describe('ChangePeople', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    changePeopleService = new ChangePeopleSerice(fakePeopleRepository);
  });

  it('Should be able to people not exists', async () => {
    await expect(
      changePeopleService.execute({
        id: '123',
        name: 'Chrystian',
        active: true,
        email: 'chrystian@gmail.com.br',
        endereco: 'Rua 27 numero 302 Iguatama-MG',
        sex: 'm',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to change people', async () => {
    const people1 = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27 numero 302',
      sex: 'm',
    });

    const peopleChange = await changePeopleService.execute({
      id: people1.id,
      active: false,
      email: 'livia@gmail.com',
      endereco: 'RUa 30 431',
      name: 'Livia',
      sex: 'f',
    });

    expect(peopleChange).toEqual({
      id: people1.id,
      active: false,
      email: 'livia@gmail.com',
      endereco: 'RUa 30 431',
      name: 'Livia',
      sex: 'f',
    });
  });
});
