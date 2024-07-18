import { MigrationInterface, QueryRunner } from 'typeorm';

export class Farms1721267754946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE farms (
          id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
          name VARCHAR(60) NOT NULL,
          code_integration INTEGER NOT NULL,
          period_service VARCHAR(60) NOT NULL,
          active BOOLEAN NOT NULL,
          creator_id UUID NOT NULL,
          created_at DATE DEFAULT CURRENT_TIMESTAMP,
          updated_at DATE,
          CONSTRAINT creator_foreign_fk FOREIGN KEY(creator_id) REFERENCES creators(id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        ALTER TABLE creators 
        ADD farm_id UUID,
        ADD CONSTRAINT farm_foreign_fk FOREIGN KEY(farm_id) REFERENCES farms(id) ON DELETE CASCADE ON UPDATE CASCADE
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE farms;
    `);
  }
}
