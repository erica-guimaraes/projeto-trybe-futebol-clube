import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress && typeof inProgress === 'string') {
      const { status, data } = await this.matchesService.getMatchesByProgress(inProgress);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
