import { Request, Response, NextFunction } from 'express'
import * as ProfileService from '../services/profile.service'
import { profileSchema } from '../validators/profile.validator'

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const profile = await ProfileService.getProfile()
        res.json(profile)
    } catch (error) {
        next(error)
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const data = profileSchema.parse(req.body)
        const updated = await ProfileService.updateProfile(data)
        res.json(updated)
    } catch (error) {
        next(error)
    }
}
