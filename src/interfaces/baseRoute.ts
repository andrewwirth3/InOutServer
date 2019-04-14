import { Application } from 'express';
export interface IBaseRoute {
    mapRoutes(app: Application);
}
