import { authenticate } from '@/http/middlewares/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/auth', authenticate, (req, res) => {
  return res.status(200).json({})
});

export default authRouter;
