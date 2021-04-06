import { Animal } from '@modules/animal/infra/typeorm/entities/Animal';
import { Batch } from '@modules/batch/infra/typeorm/entities/Batch';
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

@Entity('animal_batch')
export class AnimalBatch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_animal: string;

  @Column()
  id_batch: string;

  @Column()
  dt_entry: Date;

  @Column()
  dt_exit: Date;

  @Column()
  @UpdateDateColumn()
  dt_last_movement: Date;

  @Column()
  calf: string;

  @ManyToOne(() => Animal, animal => animal.animal_batch)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal[];

  @ManyToOne(() => Batch, batch => batch.animal_batch)
  @JoinColumn({ name: 'id_batch' })
  batch: Batch[];

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
