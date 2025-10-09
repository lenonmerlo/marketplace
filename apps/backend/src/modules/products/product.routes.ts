import { Router } from 'express';
import * as ctrl from './product.controller.js';
import { authGuard } from '../auth/auth.middleware.js';

export const productsRouter = Router();

productsRouter.get('/', authGuard, ctrl.list);
productsRouter.get('/:id', authGuard, ctrl.get);
productsRouter.post('/', authGuard, ctrl.create);
productsRouter.put('/:id', authGuard, ctrl.update);
productsRouter.delete('/:id', authGuard, ctrl.remove);
