import { FakeAnimalBatchRepository } from '@modules/animalBatch/repositories/fakes/FakeAnimalBatchRepository';
import { ShowAnimalBatchService } from '../ShowAnimalBatchService';

let fakeBatchAnimalRepository: FakeAnimalBatchRepository;
let showAnimalBatchService: ShowAnimalBatchService;

describe('CreateAnimalBatch', () => {
  beforeEach(() => {
    fakeBatchAnimalRepository = new FakeAnimalBatchRepository();
    showAnimalBatchService = new ShowAnimalBatchService(
      fakeBatchAnimalRepository,
    );
  });

  it('Should be able to list a AnimalBatch', async () => {
    // CRIANDO ANIMAL
    const batchAnimal1 = await fakeBatchAnimalRepository.create({
      calf: true,
      dt_entry: new Date(),
      dt_exit: new Date(),
      id_animal: '123',
      id_batch: '123',
    });

    const batchAnimalSave = await fakeBatchAnimalRepository.save(batchAnimal1);

    const batchAnimal2 = await fakeBatchAnimalRepository.create({
      calf: false,
      dt_entry: new Date(),
      dt_exit: new Date(),
      id_animal: '1234',
      id_batch: '1234',
    });

    const batchAnimalSave2 = await fakeBatchAnimalRepository.save(batchAnimal2);

    const showBatchAnimal = await showAnimalBatchService.execute();

    expect(showBatchAnimal).toEqual([batchAnimalSave, batchAnimalSave2]);
  });
});
