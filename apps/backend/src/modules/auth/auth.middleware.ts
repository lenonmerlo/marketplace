import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type JWTPayload = { sub: string; email: string; role: string; typ?: string };

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = header.slice('Bearer '.length).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
