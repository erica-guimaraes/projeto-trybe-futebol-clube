import { Router } from 'express';
import loginRouter from './loginRouter';
import teamsRouter from './teamsRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
