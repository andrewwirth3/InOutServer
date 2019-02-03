import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'InOut',
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'werdna',
  modelPaths: [__dirname + '/models/**/*.model.ts']
});
