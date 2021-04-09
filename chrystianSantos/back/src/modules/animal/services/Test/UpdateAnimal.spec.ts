import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { FakePeopleRepository } from '@modules/people/repositories/fakes/FakePeopleRepository';
import AppError from '@shared/errors/AppError';
import { ShowAnimalService } from '../ShowAnimalService';
import { UpdateAnimalService } from '../UpdateAnimalService';

let fakePeopleRepository: FakePeopleRepository;
let fakeAnimalRepository: FakeAnimalRepository;
let updateAnimalService: UpdateAnimalService;
describe('UpdateAnimal', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    fakeAnimalRepository = new FakeAnimalRepository();
    updateAnimalService = new UpdateAnimalService(
      fakeAnimalRepository,
      fakePeopleRepository,
    );
  });

  it('Should be able to update animal', async () => {
    const people = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27',
      sex: 'm',
    });
    await fakePeopleRepository.save(people);

    const people2 = await fakePeopleRepository.create({
      name: 'Livia',
      active: true,
      email: 'livia@gmail.com',
      endereco: 'Rua 27',
      sex: 'f',
    });
    await fakePeopleRepository.save(people2);

    const animal = await fakeAnimalRepository.create({
      born: new Date(),
      breed: 'Nelore',
      id_people: people.id,
      name: 'Duque',
      sex: 'm',
      weigth: 900,
    });
    await fakeAnimalRepository.save(animal);

    const changeAnimal = await updateAnimalService.execute({
      born: new Date('04-07-2020'),
      breed: 'Piemontês',
      id: animal.id,
      id_people: people2.id,
      name: 'Boneca',
      sex: 'f',
      weigth: 700,
    });

    expect(changeAnimal).toEqual({
      born: new Date('04-07-2020'),
      breed: 'Piemontês',
      id: animal.id,
      id_people: people2.id,
      name: 'Boneca',
      sex: 'f',
      weigth: 700,
    });
  });

  it('Should be able not exists animal', async () => {
    const people = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: true,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27',
      sex: 'm',
    });
    await fakePeopleRepository.save(people);

    await expect(
      updateAnimalService.execute({
        born: new Date(),
        breed: 'Nelore',
        id: '123',
        id_people: people.id,
        name: 'Duque',
        sex: 'm',
        weigth: 900,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able people desactive', async () => {
    const people = await fakePeopleRepository.create({
      name: 'Chrystian',
      active: false,
      email: 'chrystian@gmail.com',
      endereco: 'Rua 27',
      sex: 'm',
    });
    await fakePeopleRepository.save(people);

    await expect(
      updateAnimalService.execute({
        born: new Date(),
        breed: 'Nelore',
        id: '123',
        id_people: people.id,
        name: 'Duque',
        sex: 'm',
        weigth: 900,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able not exists people', async () => {
    await expect(
      updateAnimalService.execute({
        born: new Date(),
        breed: 'Nelore',
        id: '123',
        id_people: '1234',
        name: 'Duque',
        sex: 'm',
        weigth: 900,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
