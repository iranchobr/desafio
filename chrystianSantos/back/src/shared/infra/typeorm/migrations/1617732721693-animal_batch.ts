import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class animalBatch1617732721693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animal_batch',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_animal',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_batch',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'dt_entry',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'dt_exit',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'dt_last_movement',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'calf',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'animal_batch__animal',
            columnNames: ['id_animal'],
            referencedTableName: 'animal',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'animal_batch__batch',
            columnNames: ['id_batch'],
            referencedTableName: 'batch',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animal_batch');
  }
}
