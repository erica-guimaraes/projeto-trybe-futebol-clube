import { Request, Response, Router } from 'express';
import UsersController from '../controllers/usersController';
import ValidationsUser from '../middlewares/validationsUser';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  ValidationsUser.validateLogin,
  (req: Request, res: Response) => usersController.loginUser(req, res),
);

export default router;
