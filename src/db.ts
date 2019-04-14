import { Sequelize } from 'sequelize-typescript';

export default function InOutDb(): Sequelize {
    console.debug(__dirname + '/models/**/*');
    const seq: Sequelize = new Sequelize({
        database: 'InOut',
        dialect: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'werdna',
        modelPaths: [__dirname + '/models/**/*'],
        modelMatch: (filename, member) => {
            return (
                filename.substring(0, filename.indexOf('.model')) ===
                member.toLowerCase()
            );
        }
    });

    seq.sync();
    return;
}
