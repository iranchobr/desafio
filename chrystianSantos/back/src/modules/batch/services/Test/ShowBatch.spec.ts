import { FakeBatchRepository } from '@modules/batch/repositories/fakes/FakeBatchRepository';
import AppError from '../../../../shared/errors/AppError';
import { ShowBatchService } from '../ShowBatchService';

let fakeBatchRepository: FakeBatchRepository;
let showBatchService: ShowBatchService;
describe('ShowBatch', () => {
  beforeEach(() => {
    fakeBatchRepository = new FakeBatchRepository();
    showBatchService = new ShowBatchService(fakeBatchRepository);
  });

  it('Should be able to show a Batch', async () => {
    const batch1 = await fakeBatchRepository.create({
      name: 'Vacinados',
      description: 'Lote de animais vacinados contra aftosa',
    });

    await fakeBatchRepository.save(batch1);

    const batch2 = await fakeBatchRepository.create({
      name: 'Venda',
      description: 'Lote de animais a venda',
    });

    await fakeBatchRepository.save(batch2);

    const batch = await showBatchService.execute();

    expect(batch).toEqual([batch1, batch2]);
  });
});
