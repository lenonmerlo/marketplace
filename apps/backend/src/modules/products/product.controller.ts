import type { Request, Response } from 'express';
import * as service from './product.service.js';
import { createProductSchema, listQuerySchema, updateProductSchema } from './product.schemas.js';

export async function list(req: Request, res: Response) {
  const q = listQuerySchema.parse(req.query);
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const data = await service.list({
    ...q,
    userId: req.user.id,
  });
  return res.json(data);
}

export async function get(req: Request, res: Response) {
  const data = await service.get(req.params.id);
  return res.json(data);
}

export async function create(req: Request, res: Response) {
  const body = createProductSchema.parse(req.body);
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const data = await service.create(req.user.id, body);
  return res.status(201).json(data);
}

export async function update(req: Request, res: Response) {
  const body = updateProductSchema.parse(req.body);
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const data = await service.update(req.params.id, req.user.id, body);
  return res.json(data);
}

export async function remove(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  await service.remove(req.params.id, req.user.id);
  return res.status(204).send();
}
