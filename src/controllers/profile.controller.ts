import { Request, Response } from 'express'
import * as ProfileService from '../services/profile.service'
import { profileSchema } from '../validators/profile.validator'

export async function getProfile(req: Request, res: Response) {
    const profile = await ProfileService.getProfile()
    res.json(profile)
}

export async function updateProfile(req: Request, res: Response) {
    try {
        const data = profileSchema.parse(req.body)
        const updated = await ProfileService.updateProfile(data)
        res.json(updated)
    } catch (error) {
        res.status(400).json({ error: 'Dados inválidos', details: error })
    }
}
