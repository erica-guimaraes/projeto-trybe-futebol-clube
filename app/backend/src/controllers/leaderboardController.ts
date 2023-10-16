import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  public static async getTeamsPerformance(req: Request, res: Response) {
    const pathName = req.path.split('/')[1];
    const finishedMatche = await LeaderboardService.getTeamsPerformance(pathName);

    return res.status(200).json(finishedMatche);
  }
}
