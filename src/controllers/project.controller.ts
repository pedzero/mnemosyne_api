import { Request, Response, NextFunction } from 'express'
import { projectSchema } from '../validators/project.validator'
import * as ProjectService from '../services/project.service'

export async function fetchProjectsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const projects = await ProjectService.fetchProjects()
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
}

export async function createProjectHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { ...body } = req.body
        const data = projectSchema.parse(body)

        const project = await ProjectService.createProject(data)
        res.status(201).json(project)
    } catch (error) {
        next(error)
    }
}
