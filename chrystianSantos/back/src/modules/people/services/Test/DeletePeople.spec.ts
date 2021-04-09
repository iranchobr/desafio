import AppError from '@shared/errors/AppError';
import { FakePeopleRepository } from '../../repositories/fakes/FakePeopleRepository';
import { DeletePeopleService } from '../DeletePeopleService';

let fakePeopleRepository: FakePeopleRepository;
let deletePeopleService: DeletePeopleService;
describe('DeletePeople', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    deletePeopleService = new DeletePeopleService(fakePeopleRepository);
  });

  it('Should be able to delete people', async () => {
    const people1 = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27 numero 302',
      sex: 'm',
    });

    await fakePeopleRepository.save(people1);

    const peoples = await deletePeopleService.execute(people1.id);

    expect(peoples).toEqual(true);
  });

  it('Should be able to delete people not exists', async () => {
    await expect(deletePeopleService.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
