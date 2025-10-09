import { Router } from 'express';

export const routes = Router();

routes.get('/', (_req, res) => res.json({ message: 'Marketplace API' }));