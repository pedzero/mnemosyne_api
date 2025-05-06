import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../utils/errors'

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const expectedToken = process.env.AUTH_TOKEN

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Token is required')
    }

    const token = authHeader.split(' ')[1]

    if (token !== expectedToken) {
        throw new UnauthorizedError('Invalid token')
    }

    next()
}
