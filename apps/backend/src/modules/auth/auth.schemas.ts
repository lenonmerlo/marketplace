import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'SELLER', 'BUYER']).optional(),
});

export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export type LoginDTO = z.infer<typeof loginSchema>;

