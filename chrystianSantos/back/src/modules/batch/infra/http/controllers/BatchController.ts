import { CreateBatchService } from '@modules/batch/services/CreateBatchService';
import { ShowBatchService } from '@modules/batch/services/ShowBatchService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class BatchController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createBatchService = container.resolve(CreateBatchService);
    const createBatch = await createBatchService.execute({
      name,
      description,
    });

    return res.json(classToClass(createBatch));
  }
}
