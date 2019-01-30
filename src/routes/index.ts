import { Application, NextFunction, Request, Response } from 'express';
import Users from './users';

interface IError {
  status?: number;
  message?: string;
}

export default class Router {
  private app: Application;
  private users: Users;

  constructor(app: Application) {
    this.app = app;
    this.app.use(this.handleError);
    this.users = new Users(this.app);
  }

  public mapRoutes(): void {
    this.users.routes();
  }

  private handleError(
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  }
}
