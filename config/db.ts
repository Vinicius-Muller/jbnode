import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../config/migrations/*{.ts,.js}'],
  migrationsRun: true,
  uuidExtension: 'pgcrypto',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
