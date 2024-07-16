import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1721142338491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
						CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE users (
							id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
							username VARCHAR(60) NOT NULL,
							name VARCHAR(60) NOT NULL,
							kind VARCHAR(60) NOT NULL,
							email VARCHAR(60) NOT NULL,
							password VARCHAR(60) NOT NULL,
							created_at DATE DEFAULT CURRENT_TIMESTAMP,
							updated_at DATE,
							roles UUID
            );
						
						CREATE TABLE roles (
							id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
							name VARCHAR(60),
							partner VARCHAR(60),
							user_id UUID,
							created_at DATE DEFAULT CURRENT_TIMESTAMP,
							updated_at DATE,
							CONSTRAINT user_foreign_fk FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
						);

						ALTER TABLE users
						ADD CONSTRAINT roles_foreign_fk FOREIGN KEY(roles) REFERENCES roles(id)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DROP TABLE users;

			DROP TABLE roles;
		`);
  }
}
