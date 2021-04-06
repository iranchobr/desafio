import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '../../../../shared/errors/AppError';
import { DeleteBatchService } from '../DeleteBatchService';

let fakeBatchRepository: FakeBatchRepository;
let deleteBatchService: DeleteBatchService;
describe('Delete', () => {
  beforeEach(() => {
    fakeBatchRepository = new FakeBatchRepository();
    deleteBatchService = new DeleteBatchService(fakeBatchRepository);
  });

  it('Should be able to delete a Batch', async () => {
    const createBatch = await fakeBatchRepository.create({
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });
    await fakeBatchRepository.save(createBatch);

    const batch = await deleteBatchService.execute(createBatch.id);

    expect(batch).toEqual(true);
  });

  it('Should be able to delete a Batch not exists', async () => {
    await expect(deleteBatchService.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
