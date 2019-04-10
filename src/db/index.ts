import { Sequelize } from 'sequelize-typescript';

export default function InOutDb(): Sequelize {
    const seq: Sequelize = new Sequelize({
        database: 'InOut',
        dialect: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'werdna',
        modelPaths: [__dirname + '/models/**/*.ts']
    });

    seq.sync();
    return;
}
