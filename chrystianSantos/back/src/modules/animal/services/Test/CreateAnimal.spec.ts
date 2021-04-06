import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { FakePeopleRepository } from '@modules/people/repositories/fakes/FakePeopleRepository';
import AppError from '../../../../shared/errors/AppError';
import { CreateAnimalService } from '../CreateAnimalService';

let fakePeopleRepository: FakePeopleRepository;
let fakeAnimalRepository: FakeAnimalRepository;
let createAnimalService: CreateAnimalService;

describe('CreateAnimal', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    fakeAnimalRepository = new FakeAnimalRepository();
    createAnimalService = new CreateAnimalService(
      fakeAnimalRepository,
      fakePeopleRepository,
    );
  });

  it('Should be able to create a new Animal not people', async () => {
    await expect(
      createAnimalService.execute({
        born: new Date(),
        breed: 'Nelore',
        id_people: '123',
        name: 'Duque',
        sex: 'm',
        weigth: 900,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new Animal', async () => {
    const newPeople = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27 n 302',
      sex: 'm',
    });
    await fakePeopleRepository.save(newPeople);

    const createdAnimal = await createAnimalService.execute({
      id_people: newPeople.id,
      born: new Date(),
      breed: 'Nelore',
      name: 'Duque',
      sex: 'm',
      weigth: 500,
    });

    expect(createdAnimal).toHaveProperty('id');
  });
});
