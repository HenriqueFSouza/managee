import SessionsController from '@/http/controllers/SessionsController';
import UserController from '@/http/controllers/UserController';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/register', UserController.store);
userRouter.post('/sessions', SessionsController.store);
userRouter.get('/profile', UserController.show);

export default userRouter;
