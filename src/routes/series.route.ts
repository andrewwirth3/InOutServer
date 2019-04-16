import { Application, NextFunction, Request, Response, Router } from 'express';
import { FindOptions } from 'sequelize/types';
import { IBaseRoute } from '../interfaces/baseRoute';
import Event from '../models/event.model';
import Series from '../models/series.model';
import { Repo } from './../repository/repo';
import { RequestExtractor } from './requestExtractor';

export class SeriesRoute extends RequestExtractor implements IBaseRoute {
    private seriesRepo: Repo<Series>;
    constructor() {
        super();
        this.seriesRepo = new Repo(Series);
    }
    public mapRoutes(app: Application) {
        const router: Router = Router();

        app.use('/api/v1/series', router);
    }

    public async GetById(req: Request, res: Response, next: NextFunction) {
        try {
            const options: FindOptions = this.buildFindOptions(req);
            const scope: string = this.getScope(req);
            options.include = [
                {
                    model: Event
                }
            ];
            const series = await this.seriesRepo.findOne(
                req.params.id,
                scope,
                options
            );
            res.json(series);
        } catch (e) {
            next(e);
        }
    }
}
