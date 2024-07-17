import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectionIdCreators1721221753381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE creators
            ALTER COLUMN id SET DEFAULT uuid_generate_v4();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE creatos
            ALTER COLUMN id DROP DEFAULT;
        `);
  }
}
