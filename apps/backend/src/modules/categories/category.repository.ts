import { prisma } from '@/core/prisma.js'

export class CategoryRepository {
  listAll(q?: string) {
    return prisma.category.findMany({
      where: q ? { name: { contains: q, mode: 'insensitive' } } : undefined,
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true },
    })
  }

  getById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      select: { id: true, name: true, slug: true },
    })
  }

  getBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true },
    })
  }

  create(data: { name: string; slug: string }) {
    return prisma.category.create({
      data,
      select: { id: true, name: true, slug: true },
    })
  }

  update(id: string, data: { name?: string; slug?: string }) {
    return prisma.category.update({
      where: { id },
      data,
      select: { id: true, name: true, slug: true },
    })
  }

  delete(id: string) {
    return prisma.category.delete({ where: { id } })
  }

  countProducts(categoryId: string) {
    return prisma.product.count({ where: { categoryId } })
  }
}