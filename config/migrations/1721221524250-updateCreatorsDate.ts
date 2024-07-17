import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatorsDate1721221524250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
       ALTER TABLE creators
			 ADD created_at DATE DEFAULT CURRENT_TIMESTAMP,
			 ADD updated_at Date 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			ALTER TABLE creators
			DROP COLUMN created_at,
			DROP COLUMN updated_at
		`);
  }
}
