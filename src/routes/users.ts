import { Application, NextFunction, Request, Response, Router } from 'express';
import User from '../models/user';
import { Repo } from '../repository/repo';

const users: Router = Router();
const userRepo: Repo<User> = new Repo(User);

users.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    console.debug('got this far');
    try {
        const actor = await userRepo.findOne(req.params.id);
        res.json(actor);
    } catch (e) {
        next(e);
    }
});

export default users;
