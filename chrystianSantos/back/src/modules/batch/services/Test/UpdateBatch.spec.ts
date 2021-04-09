import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '@shared/errors/AppError';
import { UpdateBatchService } from '../UpdateBatchService';

let fakeBatchRepository: FakeBatchRepository;
let updateBatchService: UpdateBatchService;

describe('UpdateBatch', () => {
  beforeEach(() => {
    fakeBatchRepository = new FakeBatchRepository();
    updateBatchService = new UpdateBatchService(fakeBatchRepository);
  });

  it('Should be able to update a Batch', async () => {
    const createBatch = await fakeBatchRepository.create({
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });
    await fakeBatchRepository.save(createBatch);

    const batch = await updateBatchService.execute({
      id: createBatch.id,
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });

    expect(batch).toEqual({
      id: createBatch.id,
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });
  });

  it('Should be able to update a Batch not exists', async () => {
    await expect(
      updateBatchService.execute({
        id: '123',
        name: 'Lote não exist',
        description: 'Descrição não existe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
