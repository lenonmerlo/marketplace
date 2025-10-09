import { Router } from 'express';
import * as ctrl from './auth.controller.js';
import { authGuard } from './auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', ctrl.register);
authRouter.post('/login', ctrl.login);
authRouter.post('/refresh', ctrl.refresh);
authRouter.post('/logout', authGuard, ctrl.logout);
authRouter.get('/me', authGuard, ctrl.me);