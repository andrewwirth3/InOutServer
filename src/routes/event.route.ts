import {
    Application,
    NextFunction,
    Request,
    Response,
    response,
    Router
} from 'express';
import { FindOptions } from 'sequelize/types';
import { IBaseRoute } from '../interfaces/baseRoute';
import Event from '../models/event.model';
import EventResponse from '../models/eventresponse.model';
import { Repo } from '../repository/repo';
import { RequestExtractor } from './requestExtractor';

// tslint:disable-next-line:no-var-requires
const Op = require('sequelize').Op;

export class EventRoute extends RequestExtractor implements IBaseRoute {
    private eventRepo: Repo<Event>;
    private responsesRepo: Repo<EventResponse>;

    constructor() {
        super();
        this.eventRepo = new Repo(Event);
        this.responsesRepo = new Repo(EventResponse);
    }
    public mapRoutes(app: Application) {
        const router: Router = Router();

        router.get('/:id', (req, res, next) => this.GetById(req, res, next));
        router.get('/user/:username', (req, res, next) =>
            this.GetByUser(req, res, next)
        );

        app.use('/api/v1/events', router);
    }

    public async GetById(req: Request, res: Response, next: NextFunction) {
        try {
            const options: FindOptions = this.buildFindOptions(req);
            console.debug(options);
            const event = await this.eventRepo.findOne(req.params.id, options);
            res.json(event);
        } catch (e) {
            next(e);
        }
    }
    public async GetByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const responses: EventResponse[] = await this.responsesRepo.find({
                attributes: ['eventId'],
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
                    [Op.in]: responses.map((e) => e.eventId)
                }
            };
            options.include = [
                {
                    model: EventResponse
                }
            ];
            const events: Event[] = await this.eventRepo.find(options);
            res.json(events);
        } catch (e) {
            next(e);
        }
    }
}
