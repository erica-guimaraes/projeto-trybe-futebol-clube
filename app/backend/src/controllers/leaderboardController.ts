import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  async getTeamsPerformance(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getTeamsPerformance();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
