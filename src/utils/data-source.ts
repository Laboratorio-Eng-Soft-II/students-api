require('dotenv').config()
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from "../entities/Student"
import config from 'config';

const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Student],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

