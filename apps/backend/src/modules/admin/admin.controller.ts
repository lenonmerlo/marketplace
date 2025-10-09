import type { Request, Response } from 'express'
import { prisma } from '@/core/prisma.js'

export async function dashboard(req: Request, res: Response) {
  const [users, products, categories, activeProducts] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { status: 'ANUNCIADO' } }),
  ])
  res.json({ users, products, categories, activeProducts })
}
