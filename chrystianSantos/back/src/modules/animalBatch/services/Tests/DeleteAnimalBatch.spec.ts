import { FakeAnimalRepository } from '@modules/animal/repositories/fakes/FakeAnimalRepository';
import { FakeAnimalBatchRepository } from '@modules/animalBatch/repositories/fakes/FakeAnimalBatchRepository';
import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '../../../../shared/errors/AppError';
import { DeleteAnimalBatchService } from '../DeleteAnimalBatchService';

let fakeAnimalRepository: FakeAnimalRepository;
let fakeBatchRepository: FakeBatchRepository;
let fakeAnimalBatchRepository: FakeAnimalBatchRepository;
let deleteAnimalBatchService: DeleteAnimalBatchService;

describe('DeleteAnimalBatchService', () => {
  beforeEach(() => {
    fakeAnimalRepository = new FakeAnimalRepository();
    fakeBatchRepository = new FakeBatchRepository();
    fakeAnimalBatchRepository = new FakeAnimalBatchRepository();
    deleteAnimalBatchService = new DeleteAnimalBatchService(
      fakeAnimalBatchRepository,
    );
  });

  it('Should be able to delete a BatchAnimal not exists', async () => {
    await expect(
      deleteAnimalBatchService.execute('123'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to delete a BatchAnimal', async () => {
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

    const newBatchAnimal = await fakeAnimalBatchRepository.create({
      calf: true,
      dt_entry: new Date(),
      dt_exit: new Date(),
      id_animal: saveAnimal.id,
      id_batch: savedBatch.id,
    });

    const { id } = await fakeAnimalBatchRepository.save(newBatchAnimal);

    const deleteAnimal = await deleteAnimalBatchService.execute(id);

    expect(deleteAnimal).toEqual(true);
  });
});
