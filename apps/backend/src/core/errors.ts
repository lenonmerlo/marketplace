import { error } from "console";
import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    status: number;
    constructor(message: string, status = 400) {
        super(message);
        this.status = status;
    }
}

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const status = err?.status || 500;
    res.status(status).json({ error: err?.message || "Internal Server Error" });
}