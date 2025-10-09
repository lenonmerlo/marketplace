import type { Request, Response, NextFunction } from 'express'
import type { Role } from '@prisma/client'

export function roleGuard(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) return res.status(401).json({ error: 'Unauthorized' })
    if (!roles.includes(user.role as Role)) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    next()
  }
}
