import { Router, type RequestHandler } from 'express';
import * as ctrl from './product.controller.js';
import { authGuard } from '../auth/auth.middleware.js';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (_req, file, cb) =>
      cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const productsRouter = Router();


const uploadSingle: RequestHandler = upload.single('image') as unknown as RequestHandler;

productsRouter.get('/', authGuard, ctrl.list);
productsRouter.get('/:id', authGuard, ctrl.get);
productsRouter.post('/', authGuard, uploadSingle, ctrl.create);
productsRouter.put('/:id', authGuard, uploadSingle, ctrl.update);
productsRouter.delete('/:id', authGuard, ctrl.remove);
