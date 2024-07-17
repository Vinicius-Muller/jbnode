import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1721152049733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE creators (
				id UUID NOT NULL PRIMARY KEY,
				name VARCHAR(60) NOT NULL,
				kidn VARCHAR(60) NOT NULL,
				email VARCHAR(60) NOT NULL,
				operation BOOLEAN NOT NULL,
				active BOOLEAN NOT NULL,
				user_id UUID NOT NULL,
				CONSTRAINT user_foreign_fk FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
			);

			ALTER TABLE users 
			ADD creator_id UUID,
			ADD CONSTRAINT creator_foreign_fk FOREIGN KEY(creator_id) REFERENCES creators(id) ON DELETE CASCADE ON UPDATE CASCADE;
	`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP TABLE creators;
		`);
  }
}
