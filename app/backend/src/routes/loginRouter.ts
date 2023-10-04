import { Request, Response, Router } from 'express';
import UsersController from '../controllers/usersController';
import ValidationsToken from '../middlewares/validationsToken';
import ValidationsUser from '../middlewares/validationsUser';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  ValidationsUser.validateLogin,
  (req: Request, res: Response) => usersController.loginUser(req, res),
);

router.get(
  '/role',
  ValidationsToken.validateToken,
  (req: Request, res: Response) => usersController.userRole(req, res),
);

export default router;
