import { prisma } from '@/core/prisma.js';
import type { CreateProductInput, UpdateProductInput } from './product.model.js';

export async function createProdut(userId: string, data: CreateProductInput) {
  const prismaData: any = {
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl ?? null,
    status: 'ANUNCIADO',
    user: { connect: { id: userId } },
  };


  if (typeof data.category !== 'undefined') {
    prismaData.category = data.category; 
  }


  if (!prismaData.category && typeof (data as any).categoryId === 'string') {
    const cat = await prisma.category.findUnique({
      where: { id: (data as any).categoryId },
      select: { name: true },
    });
    if (!cat) throw new Error('Categoria inválida');
    prismaData.category = cat.name; 
    prismaData.categoryRef = { connect: { id: (data as any).categoryId } };
  } else if (typeof (data as any).categoryId === 'string') {
    prismaData.categoryRef = { connect: { id: (data as any).categoryId } };
  }

  return prisma.product.create({ data: prismaData });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function listProducts(params: {
  q?: string;
  status?: 'ANUNCIADO' | 'VENDIDO' | 'DESATIVADO';
  category?: string;
  categoryId?: string;
  page: number;
  pageSize: number;
  userId: string;
}) {
  const { q, status, category, categoryId, page, pageSize, userId } = params;

  return prisma.product.findMany({
    where: {
      userId,
      status,
      category,                
      ...(categoryId ? { categoryId } : {}),
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
  const prismaData: any = {};


  if (typeof data.title !== 'undefined') prismaData.title = data.title;
  if (typeof data.description !== 'undefined') prismaData.description = data.description;
  if (typeof data.price !== 'undefined') prismaData.price = data.price;
  if (typeof data.imageUrl !== 'undefined') prismaData.imageUrl = data.imageUrl ?? null;
  if (typeof data.status !== 'undefined') prismaData.status = data.status;


  if (typeof data.category !== 'undefined') prismaData.category = data.category;


  if (data.category === null) {
    prismaData.categoryRef = { disconnect: true };
    // mantém category textual atual
  } else if (typeof data.category === 'string') {

    if (typeof data.category === 'undefined') {
      const cat = await prisma.category.findUnique({
        where: { id: data.category },
        select: { name: true },
      });
      if (!cat) throw new Error('Categoria inválida');
      prismaData.category = cat.name;
    }
    prismaData.categoryRef = { connect: { id: data.category } };
  }

  return prisma.product.update({ where: { id }, data: prismaData });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}
