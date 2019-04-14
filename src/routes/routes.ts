import { IBaseRoute } from '../interfaces/baseRoute';
import { EventRoute } from './event.route';
import { SquadRoute } from './squad.route';
import { UserRoute } from './user.route';

const routes: IBaseRoute[] = [
    new EventRoute(),
    new SquadRoute(),
    new UserRoute()
];
export default routes;
