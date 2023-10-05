import { Router } from 'express';
import loginRouter from './loginRouter';
import matchesRouter from './matchesRouter';
import teamsRouter from './teamsRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
