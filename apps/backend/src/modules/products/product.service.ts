import type { CreateProductInput, UpdateProductInput } from './product.model.js';
import * as repo from './product.repository.js';
import { AppError } from '@/core/errors.js';

export function create(userId: string, data: CreateProductInput) {
  return repo.createProdut(userId, data);
}

export async function get(id: string) {
  const p = await repo.getProductById(id);
  if (!p) throw new AppError('Produto não encontrado', 404);
  return p;
}

export function list(query: {
  q?: string;
  status?: 'ANUNCIADO' | 'VENDIDO' | 'DESATIVADO';
  category?: string;
  page: number;
  pageSize: number;
  userId: string;
}) {
  return repo.listProducts(query);
}

export async function update(id: string, userId: string, data: UpdateProductInput) {
  const current = await repo.getProductById(id);
  if (!current) throw new AppError('Produto não encontrado', 404);
  if (current.userId !== userId) throw new AppError('Você não tem permissão para editar este produto', 403);
  return repo.updateProduct(id, data);
}

export async function remove(id: string, userId: string) {
  const current = await repo.getProductById(id);
  if (!current) throw new AppError('Produto não encontrado', 404);
  if (current.userId !== userId) throw new AppError('Você não tem permissão para deletar este produto', 403);
  await repo.deleteProduct(id);
}
