export interface ICreateAnimalDTO {
  id_people: string;
  name: string;
  breed: string;
  sex: 'f' | 'm';
  weigth: number;
  born: Date;
}
