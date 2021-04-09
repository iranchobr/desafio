import { Animal } from '@modules/animal/infra/typeorm/entities/Animal';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('people')
export class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  endereco: string;

  @Column()
  sex: string;

  @Column()
  active: boolean;

  @OneToMany(() => Animal, animal => animal.people)
  @JoinColumn({ name: 'id' })
  animal: Animal[];

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
