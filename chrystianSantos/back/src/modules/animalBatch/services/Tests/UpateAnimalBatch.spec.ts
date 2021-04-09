import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { FakeAnimalBatchRepository } from '@modules/animalBatch/repositories/fakes/FakeAnimalBatchRepository';
import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '../../../../shared/errors/AppError';
import { UpdateAnimalBatchService } from '../UpdateAnimalBatchService';

let fakeBatchRepository: FakeBatchRepository;
let fakeAnimalRepository: FakeAnimalRepository;
let fakeBatchAnimalRepository: FakeAnimalBatchRepository;
let updateAnimalBatchService: UpdateAnimalBatchService;

describe('UpdateAnimalBatch', () => {
  beforeEach(() => {
    fakeBatchRepository = new FakeBatchRepository();
    fakeAnimalRepository = new FakeAnimalRepository();
    fakeBatchAnimalRepository = new FakeAnimalBatchRepository();

    updateAnimalBatchService = new UpdateAnimalBatchService(
      fakeBatchAnimalRepository,
      fakeBatchRepository,
      fakeAnimalRepository,
    );
  });

  it('Should be able to update a AnimalBatch', async () => {
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
    const date = new Date();
    const createAnimalBatch = await fakeBatchAnimalRepository.create({
      id_batch: savedBatch.id,
      id_animal: saveAnimal.id,
      calf: true,
      dt_entry: date,
      dt_exit: date,
    });
    await fakeBatchAnimalRepository.save(createAnimalBatch);

    const updateAnimalBatch = await updateAnimalBatchService.execute({
      id: createAnimalBatch.id,
      id_animal: createAnimalBatch.id_animal,
      id_batch: createAnimalBatch.id_batch,
      calf: false,
      dt_entry: date,
      dt_exit: date,
    });
    expect(updateAnimalBatch).toEqual({
      id: createAnimalBatch.id,
      id_animal: createAnimalBatch.id_animal,
      id_batch: createAnimalBatch.id_batch,
      calf: false,
      dt_entry: date,
      dt_exit: date,
    });
  });

  it('Should be able to update a AnimalBatch not batch', async () => {
    const createAnimal = await fakeAnimalRepository.create({
      id_people: '1234',
      born: new Date(),
      breed: 'Nelore',
      name: 'Duque',
      sex: 'm',
      weigth: 1000,
    });
    const saveAnimal = await fakeAnimalRepository.save(createAnimal);
    const date = new Date();
    const createAnimalBatch = await fakeBatchAnimalRepository.create({
      id_batch: '123',
      id_animal: saveAnimal.id,
      calf: true,
      dt_entry: date,
      dt_exit: date,
    });

    await fakeBatchAnimalRepository.save(createAnimalBatch);

    await expect(
      updateAnimalBatchService.execute({
        id: createAnimalBatch.id,
        id_animal: saveAnimal.id,
        id_batch: '123',
        calf: false,
        dt_entry: date,
        dt_exit: date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a AnimalBatch not animal', async () => {
    const createBatch = await fakeBatchRepository.create({
      name: 'Lote vendido',
      description: 'Animais vendidos',
    });
    const savedBatch = await fakeBatchRepository.save(createBatch);

    const date = new Date();

    const createAnimalBatch = await fakeBatchAnimalRepository.create({
      id_batch: savedBatch.id,
      id_animal: '123',
      calf: true,
      dt_entry: date,
      dt_exit: date,
    });

    await fakeBatchAnimalRepository.save(createAnimalBatch);

    await expect(
      updateAnimalBatchService.execute({
        id: createAnimalBatch.id,
        id_animal: '123',
        id_batch: savedBatch.id,
        calf: true,
        dt_entry: date,
        dt_exit: date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
