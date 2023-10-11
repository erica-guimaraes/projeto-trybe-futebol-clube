import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matchesController';
import ValidationsToken from '../middlewares/validationsToken';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

router.patch(
  '/:id',
  ValidationsToken.validateToken,
  (req: Request, res: Response) => matchesController.updateMatches(req, res),
);

router.patch(
  '/:id/finish',
  ValidationsToken.validateToken,
  (req: Request, res: Response) => matchesController.getByIdMatches(req, res),
);

router.post(
  '/',
  ValidationsToken.validateToken,
  (req: Request, res: Response) => matchesController.createMatche(req, res),
);

export default router;
