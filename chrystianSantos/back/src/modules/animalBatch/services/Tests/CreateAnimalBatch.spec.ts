import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { FakeAnimalBatchRepository } from '@modules/animalBatch/repositories/fakes/FakeAnimalBatchRepository';
import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '../../../../shared/errors/AppError';
import { CreateAnimalBatchService } from '../CreateAnimalBatchService';

let fakeBatchRepository: FakeBatchRepository;
let fakeAnimalRepository: FakeAnimalRepository;
let fakeBatchAnimalRepository: FakeAnimalBatchRepository;
let createAnimalBatchService: CreateAnimalBatchService;

describe('CreateAnimalBatch', () => {
  beforeEach(() => {
    fakeBatchRepository = new FakeBatchRepository();
    fakeAnimalRepository = new FakeAnimalRepository();
    fakeBatchAnimalRepository = new FakeAnimalBatchRepository();

    createAnimalBatchService = new CreateAnimalBatchService(
      fakeBatchAnimalRepository,
      fakeBatchRepository,
      fakeAnimalRepository,
    );
  });

  it('Should be able to create a new AnimalBatch', async () => {
    // CRIANDO ANIMAL
    const createAnimal = await fakeAnimalRepository.create({
      id_people: '1234',
      born: new Date(),
      breed: 'Nelore',
      name: 'Duque',
      sex: 'm',
      weigth: 1000,
    });
    const saveAnimal = await fakeAnimalRepository.save(createAnimal);

    // CRIANDO LOTE
    const createBatch = await fakeBatchRepository.create({
      name: 'Lote vendido',
      description: 'Animais vendidos',
    });
    const savedBatch = await fakeBatchRepository.save(createBatch);

    const createAnimalBatch = await createAnimalBatchService.execute({
      id_animal: saveAnimal.id,
      id_batch: savedBatch.id,
      calf: true,
      dt_entry: new Date(),
      dt_exit: new Date(),
    });
    expect(createAnimalBatch).toHaveProperty('id');
  });

  it('Should be able to create a new AnimalBatch not batch', async () => {
    const createAnimal = await fakeAnimalRepository.create({
      id_people: '1234',
      born: new Date(),
      breed: 'Nelore',
      name: 'Duque',
      sex: 'm',
      weigth: 1000,
    });
    const saveAnimal = await fakeAnimalRepository.save(createAnimal);

    await expect(
      createAnimalBatchService.execute({
        id_animal: saveAnimal.id,
        id_batch: '1234',
        dt_entry: new Date(),
        dt_exit: new Date(),
        calf: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able to create a new AnimalBatch not animal', async () => {
    const createBatch = await fakeBatchRepository.create({
      name: 'Lote vendido',
      description: 'Animais vendidos',
    });
    const savedBatch = await fakeBatchRepository.save(createBatch);

    await expect(
      createAnimalBatchService.execute({
        id_animal: '1234',
        id_batch: savedBatch.id,
        dt_entry: new Date(),
        dt_exit: new Date(),
        calf: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
