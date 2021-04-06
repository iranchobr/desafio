import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '../../../../shared/errors/AppError';
import { CreateBatchService } from '../CreateBatchService';

let fakeBatchRepository: FakeBatchRepository;
let createBatchService: CreateBatchService;
describe('CreateBatch', () => {
  beforeEach(() => {
    fakeBatchRepository = new FakeBatchRepository();
    createBatchService = new CreateBatchService(fakeBatchRepository);
  });

  it('Should be able to create a new Batch', async () => {
    const batch = await createBatchService.execute({
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });

    expect(batch).toHaveProperty('id');
  });

  it('Should be able to create a new People with duplicate name', async () => {
    const createBatch = await fakeBatchRepository.create({
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });

    await fakeBatchRepository.save(createBatch);

    await expect(
      createBatchService.execute({
        name: 'Vacinados',
        description: 'Lote de animais vacinados contra aftosa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
