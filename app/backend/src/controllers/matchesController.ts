import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAllMatches();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
