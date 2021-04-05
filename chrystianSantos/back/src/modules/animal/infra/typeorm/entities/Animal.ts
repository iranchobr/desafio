import { People } from '@modules/people/infra/typeorm/entities/People';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('animal')
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_people: string;

  @Column()
  name: string;

  @Column()
  breed: number;

  @Column()
  sex: string;

  @Column()
  wigth: number;

  @Column()
  born: Date;

  @ManyToOne(() => People, people => people.animal)
  people: People;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
