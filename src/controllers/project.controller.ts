import { Request, Response, NextFunction } from 'express'
import { projectSchema } from '../validators/project.validator'
import { createProject } from '../services/project.service'

export async function createProjectHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { ...body } = req.body
        const data = projectSchema.parse(body)

        const project = await createProject(data)
        res.status(201).json(project)
    } catch (error) {
        next(error)
    }
}
