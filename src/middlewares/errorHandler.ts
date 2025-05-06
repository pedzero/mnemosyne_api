import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/errors'

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        })
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            issues: err.errors.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        })
    }

    console.error('[UnhandledError]', err)

    return res.status(500).json({
        error: 'Internal server error'
    })
}
