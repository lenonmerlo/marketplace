import type { Request, Response } from 'express'
import { CategoryService } from './category.service.js'
import {
  categoryCreateSchema,
  categoryUpdateSchema,
  listCategoriesQuerySchema,
} from './category.schemas.js'

const service = new CategoryService()

export async function listCategories(req: Request, res: Response) {
  const { q } = listCategoriesQuerySchema.parse(req.query)
  const items = await service.listAll(q)
  return res.json({ items })
}

export async function createCategory(req: Request, res: Response) {
  const body = categoryCreateSchema.parse(req.body)
  const created = await service.create(body)
  return res.status(201).json(created)
}

export async function updateCategory(req: Request, res: Response) {
  const body = categoryUpdateSchema.parse(req.body)
  const updated = await service.update(req.params.id, body)
  return res.json(updated)
}

export async function deleteCategory(req: Request, res: Response) {
  await service.remove(req.params.id)
  return res.status(204).send()
}
