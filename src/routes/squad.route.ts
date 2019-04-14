import { Application, NextFunction, Request, Response, Router } from 'express';
import { FindOptions } from 'sequelize/types';
import { IBaseRoute } from '../interfaces/baseRoute';
import Squad from '../models/squad.model';
import SquadMember from '../models/squadmember.model';
import { Repo } from '../repository/repo';
import { RequestExtractor } from './requestExtractor';

// tslint:disable-next-line:no-var-requires
const Op = require('sequelize').Op;

export class SquadRoute extends RequestExtractor implements IBaseRoute {
    private squadRepo: Repo<Squad>;
    private squadMemberRepo: Repo<SquadMember>;

    constructor() {
        super();
        this.squadRepo = new Repo(Squad);
        this.squadMemberRepo = new Repo(SquadMember);
    }
    public mapRoutes(app: Application) {
        const router: Router = Router();

        router.get('/:id', (req, res, next) => this.GetById(req, res, next));
        router.get('/user/:username', (req, res, next) =>
            this.GetByUser(req, res, next)
        );

        app.use('/api/v1/squads', router);
    }

    public async GetById(req: Request, res: Response, next: NextFunction) {
        try {
            const options: FindOptions = this.buildFindOptions(req);
            console.debug(options);
            const squad = await this.squadRepo.findOne(req.params.id, options);
            res.json(squad);
        } catch (e) {
            next(e);
        }
    }

    public async GetByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const responses: SquadMember[] = await this.squadMemberRepo.find({
                attributes: ['squadId'],
                where: {
                    username: req.params.username
                }
            });
            if (responses == null || responses.length === 0) {
                res.json([]);
                return;
            }
            const options: FindOptions = this.buildFindOptions(req);
            options.where = {
                id: {
                    [Op.in]: responses.map((e) => e.squadId)
                }
            };
            options.include = [
                {
                    model: SquadMember
                }
            ];
            const squads: Squad[] = await this.squadRepo.find(options);
            res.json(squads);
        } catch (e) {
            next(e);
        }
    }
}
