import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import Router from './routes';

class Server {
  public app: express.Application;
  public router: Router;

  constructor() {
    this.app = express(); // run the express instance and store in app
    this.router = new Router(this.app); // add routes

    this.router.mapRoutes();
    this.config();
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
