import { Application, NextFunction, Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';
import users from './users';

interface IError {
    status?: number;
    message?: string;
}

export default class Router {
    private app: Application;
    private db: Sequelize;

    constructor(app: Application, db: Sequelize) {
        this.app = app;
        this.db = db;
        this.app.use(this.handleError);
        this.initRoutes();
    }

    private initRoutes() {
        this.app.use('/api/v1/users', users);
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
