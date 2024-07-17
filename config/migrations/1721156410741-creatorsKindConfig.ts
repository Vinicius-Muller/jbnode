import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatorsKindConfig1721156410741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE creators RENAME kidn TO kind;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE creators RENAME kind TO kidn;
      `);
  }
}
