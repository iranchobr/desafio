import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { FakePeopleRepository } from '@modules/people/repositories/fakes/FakePeopleRepository';
import AppError from '../../../../shared/errors/AppError';
import { CreateAnimalService } from '../CreateAnimalService';
import { DeleteAnimalService } from '../DeleteAnimalService';

let fakeAnimalRepository: FakeAnimalRepository;
let deleteAnimalService: DeleteAnimalService;

describe('DeleteAnimal', () => {
  beforeEach(() => {
    fakeAnimalRepository = new FakeAnimalRepository();
    deleteAnimalService = new DeleteAnimalService(fakeAnimalRepository);
  });

  it('Should be able to delete a Animal not exists', async () => {
    await expect(deleteAnimalService.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('Should be able to create a new Animal', async () => {
    const newAnimal = await fakeAnimalRepository.create({
      id_people: '123',
      born: new Date(),
      breed: 'Nelore',
      name: 'Duque',
      sex: 'm',
      weigth: 900,
    });

    await fakeAnimalRepository.save(newAnimal);

    const deleteAnimal = await deleteAnimalService.execute(newAnimal.id);

    expect(deleteAnimal).toEqual(true);
  });
});
