import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '@/core/errors.js'

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation error', details: err.flatten() })
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode ?? 400).json({ error: err.message })
  }
  console.error(err)
  return res.status(500).json({ error: 'Internal server error' })
}
