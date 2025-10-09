import type { Request, Response } from 'express';
import { registerSchema, loginSchema } from './auth.schemas.js';
import * as service from './auth.service.js';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export async function register(req: Request, res: Response) {
    const dto = registerSchema.parse(req.body);
    const result = await service.register(dto);
    res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
    const dto = loginSchema.parse(req.body);
    const result = await service.login(dto);
    res.status(200).json(result);
}

export async function me(req: Request, res: Response) {
    return res.status(200).json({ user: req.user });
}

export async function refresh(req: Request, res: Response) {
    const { refreshToken } = req.body ?? {};
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required' });
    return res.json(service.refresh(refreshToken));
}

export async function logout(req: Request, res: Response) {
    return res.status(204).send();
}