import { Application, Request, Response } from 'express';

export default class Users {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public routes(): void {
    this.app.route('/api/v1/users').get(this.all);
    this.app.route('/api/v1/users/:userId').get(this.byId);
  }

  private byId(req: Request, res: Response): void {
    console.debug(req.params);
    const { userId } = req.params;
    res.status(200).send([userId]);
  }

  private all(req: Request, res: Response): void {
    res.status(200).send(['andrew Wirth', 'andrew Wirth', 'andrew Wirth']);
  }
}
