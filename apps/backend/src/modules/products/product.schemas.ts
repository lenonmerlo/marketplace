import { z } from "zod";

export const productStatusEnum = z.enum(["ANUNCIADO", "VENDIDO", "DESATIVADO"]);

export const createProductSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  price: z.coerce.number().positive(),
  category: z.string().min(2),
  imageUrl: z.string().url().nullable().optional(),
});

export const updateProductSchema = createProductSchema.partial().extend({
  status: productStatusEnum.optional(),
});

export const listQuerySchema = z.object({
  q: z.string().min(1).optional(),
  status: productStatusEnum.optional(),
  category: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
});
