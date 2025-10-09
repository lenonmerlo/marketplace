import { authRouter } from '@/modules/auth/auth.router.js';
import { productsRouter } from '@/modules/products/product.routes.js';
import { Router } from 'express';

export const routes = Router();

routes.get('/', (_req, res) => res.json({ message: 'Marketplace API' }));
routes.use('/auth', authRouter);
routes.use('/products', productsRouter);