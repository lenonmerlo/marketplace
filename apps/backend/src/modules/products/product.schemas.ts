import { z } from "zod";

export const productStatusEnum = z.enum(["ANUNCIADO", "VENDIDO", "DESATIVADO"]);

export const createProductSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  price: z.coerce.number().positive(),
  imageUrl: z.string().url().optional(),
  status: productStatusEnum.optional(),
  category: z.string().optional(),             
  categoryId: z.string().cuid().optional(),    
}).refine(d => d.category || d.categoryId, {
  path: ["category"],
  message: 'Informe "category" (texto) ou "categoryId".',
});

export const updateProductSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(2).optional(),
  price: z.coerce.number().positive().optional(),
  imageUrl: z.string().url().optional(),
  status: productStatusEnum.optional(),
  category: z.string().optional(),
  categoryId: z.string().cuid().optional().nullable(),
}).refine(d => d.category || d.categoryId, {
  path: ["category"],
  message: 'Informe "category" (texto) ou "categoryId".',
});

export const listQuerySchema = z.object({
  q: z.string().min(1).optional(),
  status: productStatusEnum.optional(),
  category: z.string().trim().optional(),
  categoryId: z.string().cuid().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
});

export const productUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(2).optional(),
  price: z.coerce.number().positive().optional(),
  imageUrl: z.string().url().optional(),
  status: productStatusEnum.optional(),
  category: z.string().optional(),
  categoryId: z.string().cuid().optional(),
}).refine(d => d.category || d.categoryId, {
  path: ["category"],
  message: 'Informe "category" (texto) ou "categoryId".',
});
