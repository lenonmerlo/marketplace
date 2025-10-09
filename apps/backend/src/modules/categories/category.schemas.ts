import { z } from 'zod';

export const categorySchema = z.object({
    id: z.string().cuid(),
    name: z.string().min(3).max(50),
    slug: z.string().min(3).max(80),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const listCategoriesQuerySchema = z.object({
    q: z.string().min(3).max(60).optional(),
});

export const categoryCreateSchema = z.object({
    name: z.string().min(3).max(50),
});

export const categoryUpdateSchema = z.object({
    name: z.string().min(3).max(50),
});

export type CategoryDTO = z.infer<typeof categorySchema>;
export type ListCategoriesQuery = z.infer<typeof listCategoriesQuerySchema>;


