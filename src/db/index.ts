import { Sequelize } from 'sequelize-typescript';

export default class InOutDb {
  private seq: Sequelize;

  constructor() {
    this.seq = new Sequelize({
      database: 'InOut',
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'werdna',
      modelPaths: [__dirname + '/models/**/*.ts']
    });

    this.sequelize();
  }

  private async sequelize(): Promise<void> {
    await this.seq.sync();
  }
}
