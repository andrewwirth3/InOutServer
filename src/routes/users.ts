import { Application, NextFunction, Request, Response, Router } from 'express';
import User from '../db/models/user';

const users: Router = Router();

users.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  console.debug('got this far');
  try {
    const actor = await User.findById(req.params.id);
    res.json(actor);
  } catch (e) {
    next(e);
  }
});

export default users;
