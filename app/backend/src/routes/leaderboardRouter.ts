import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getTeamsPerformance(req, res),
);

export default router;
