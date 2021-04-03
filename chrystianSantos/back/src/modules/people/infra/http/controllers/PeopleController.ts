// import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class PeopleController {
  public async create(req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'PEOPLE' })
  }
}
