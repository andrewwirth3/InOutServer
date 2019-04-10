import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Sequelize } from 'sequelize-typescript';
import InitSequelize from './db';
import Router from './routes';

class Server {
    public app: express.Application;
    public router: Router;
    public db: Sequelize;

    constructor() {
        // initialize DB
        this.db = InitSequelize();

        // create server
        this.app = express();

        // map routes
        this.router = new Router(this.app, this.db);

        // read config
        this.config();

        // listen on port
        this.listen();
    }

    private listen(): void {
        const port: string | number = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.debug('listening on port ' + port);
        });
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
    }
}

// grab values from the .env file
dotenv.config();
const server: Server = new Server();
