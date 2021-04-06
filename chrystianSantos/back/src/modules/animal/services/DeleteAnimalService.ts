import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAnimalRepository } from '../repositories/IAnimalRepository';

@injectable()
export class DeleteAnimalService {
  constructor(
    @inject('AnimalRepository')
    private animalRepository: IAnimalRepository,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const findAnimalId = await this.animalRepository.findById(id);

    if (!findAnimalId) {
      throw new AppError('Animal não encontrado', 404);
    }
    await this.animalRepository.delete(findAnimalId);
    return true;
  }
}
