export interface ICreateAnimalBatchDTO {
  id_animal: string;
  id_batch: string;
  dt_entry: Date;
  dt_exit: Date;
  calf: boolean;
}
