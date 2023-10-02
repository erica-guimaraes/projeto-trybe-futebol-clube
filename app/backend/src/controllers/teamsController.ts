import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getByIdTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getByIdTeam(Number(id));

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
