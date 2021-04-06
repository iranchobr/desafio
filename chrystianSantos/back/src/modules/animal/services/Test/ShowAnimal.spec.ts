import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { ShowAnimalService } from '../ShowAnimalService';

let fakeAnimalRepository: FakeAnimalRepository;
let showAnimalService: ShowAnimalService;
describe('ShowAnimal', () => {
  beforeEach(() => {
    fakeAnimalRepository = new FakeAnimalRepository();
    showAnimalService = new ShowAnimalService(fakeAnimalRepository);
  });

  it('Should be able to list animal', async () => {
    const animal = await fakeAnimalRepository.create({
      born: new Date(),
      breed: 'Nelore',
      id_people: '123',
      name: 'Duque',
      sex: 'm',
      weigth: 900,
    });
    await fakeAnimalRepository.save(animal);

    const animal2 = await fakeAnimalRepository.create({
      born: new Date(),
      breed: 'Piemontêsa',
      id_people: '1234',
      name: 'Boneca',
      sex: 'f',
      weigth: 900,
    });
    await fakeAnimalRepository.save(animal2);

    const animals = await showAnimalService.execute();

    expect(animals).toEqual([animal, animal2]);
  });
});
