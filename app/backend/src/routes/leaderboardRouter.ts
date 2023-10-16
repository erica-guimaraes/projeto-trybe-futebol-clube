import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => LeaderboardController.getTeamsPerformance(req, res),
);

export default router;
