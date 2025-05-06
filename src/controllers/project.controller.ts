import { Request, Response, NextFunction } from 'express'
import { projectSchema } from '../validators/project.validator'
import * as ProjectService from '../services/project.service'
import { idParamSchema } from '../validators/params.validator'
import { BadRequestError } from '../utils/errors'

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

export async function fetchSingleProjectHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const parseResult = idParamSchema.safeParse(req.params)

        if (!parseResult.success) {
            throw new BadRequestError('Invalid "id" parameter. Must be an integer')
        }

        const id = parseInt(parseResult.data.id, 10)

        const project = await ProjectService.fetchSingleProject(id)
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}
