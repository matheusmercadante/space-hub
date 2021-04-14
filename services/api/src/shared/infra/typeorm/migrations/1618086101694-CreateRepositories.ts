import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRepositories1618086101694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'repositories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'package_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'file',
            type: 'varchar',
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
      }),
    );

    await queryRunner.createForeignKeys('repositories', [
      new TableForeignKey({
        name: 'RepositoryPackage',
        columnNames: ['package_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'packages',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'RepositoryUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repositories', 'RepositoryUser')
    await queryRunner.dropForeignKey('repositories', 'RepositoryPackage')

    await queryRunner.dropTable('repositories');
  }
}

/**
 *  Package {
 *
 *    id
 *    user_id
 *    name: Clients
 *
 *    repositories [
 *      {
 *        name: categories,
 *        file: https://api.sheet...,
 *        comparison_table: categoryEntity
 *      },
 *      {
 *
 *      }
 *    ]
 *
 *  }
 *
 */
