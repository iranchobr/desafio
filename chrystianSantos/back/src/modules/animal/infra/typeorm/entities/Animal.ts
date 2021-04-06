import { People } from '@modules/people/infra/typeorm/entities/People';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  breed: string;

  @Column()
  sex: string;

  @Column()
  weigth: number;

  @Column()
  born: Date;

  @ManyToOne(() => People, people => people.animal)
  @JoinColumn({ name: 'id_people' })
  people: People;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
