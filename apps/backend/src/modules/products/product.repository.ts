import { prisma } from '@/core/prisma.js';
import type { CreateProductInput, UpdateProductInput } from './product.model.js';

export async function createProdut(userId: string, data: CreateProductInput) {
  return prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      imageUrl: data.imageUrl ?? null,
      status: 'ANUNCIADO',
      user: { connect: { id: userId } }, // associa ao dono
    },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function listProducts(params: {
  q?: string;
  status?: 'ANUNCIADO' | 'VENDIDO' | 'DESATIVADO';
  category?: string;
  page: number;
  pageSize: number;
  userId: string;
}) {
  const { q, status, category, page, pageSize, userId } = params;

  return prisma.product.findMany({
    where: {
      userId,
      status,
      category,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  return prisma.product.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      imageUrl: data.imageUrl ?? null,
      status: data.status,
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
