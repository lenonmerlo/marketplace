import { authRouter } from '@/modules/auth/auth.router.js';
import { Router } from 'express';

export const routes = Router();

routes.get('/', (_req, res) => res.json({ message: 'Marketplace API' }));
routes.use('/auth', authRouter)