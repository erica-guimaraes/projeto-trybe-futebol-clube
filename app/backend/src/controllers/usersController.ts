import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.usersService.loginUser(email, password);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
