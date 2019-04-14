import { Application, NextFunction, Request, Response, Router } from 'express';
import { FindOptions } from 'sequelize/types';
import User from '../models/user.model';
import { Repo } from '../repository/repo';
import { IBaseRoute } from './../interfaces/baseRoute';
import { RequestExtractor } from './requestExtractor';

export class UserRoute extends RequestExtractor implements IBaseRoute {
    private userRepo: Repo<User>;

    constructor() {
        super();
        this.userRepo = new Repo(User);
    }
    public mapRoutes(app: Application) {
        const router: Router = Router();

        router.get('/:id', this.GetById);

        app.use('/api/v1/users', router);
    }

    public async GetById(req: Request, res: Response, next: NextFunction) {
        try {
            const options: FindOptions = this.buildFindOptions(req);
            console.debug(options);
            const user = await this.userRepo.findOne(req.params.id, options);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}
