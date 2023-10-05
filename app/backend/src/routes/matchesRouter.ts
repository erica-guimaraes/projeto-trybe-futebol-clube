import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';
// import ValidationsToken from '../middlewares/validationsToken';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  // ValidationsToken.validateToken,
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

export default router;
