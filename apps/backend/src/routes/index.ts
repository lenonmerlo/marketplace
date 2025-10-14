import { authRouter } from '@/modules/auth/auth.router.js';
import { productsRouter } from '@/modules/products/product.routes.js';
import categoryRoutes from '@/modules/categories/category.routes.js';
import { Router } from 'express';
import adminRoutes from '@/modules/admin/admin.routes.js';

export const routes = Router();

routes.get('/', (_req, res) => res.json({ message: 'Marketplace API' }));
routes.use('/auth', authRouter);
routes.use('/products', productsRouter);
routes.use('/categories', categoryRoutes);
routes.use('/admin', adminRoutes);