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
        const files = req.files as Express.Multer.File[]

        const project = await ProjectService.createProject(data, files)
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

export async function updateProjectHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const paramResult = idParamSchema.safeParse(req.params)
        if (!paramResult.success) {
            throw new BadRequestError('Invalid "id" parameter. Must be an integer')
        }

        const bodyResult = projectSchema.safeParse(req.body)
        if (!bodyResult.success) {
            throw new BadRequestError('Invalid project data')
        }

        const id = parseInt(paramResult.data.id, 10)
        const data = bodyResult.data
        const files = req.files as Express.Multer.File[]

        const project = await ProjectService.updateProject(id, data, files)
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

export async function deleteProjectHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const paramResult = idParamSchema.safeParse(req.params)
        if (!paramResult.success) {
            throw new BadRequestError('Invalid "id" parameter. Must be an integer')
        }

        const id = parseInt(paramResult.data.id, 10)

        const message = await ProjectService.deleteProject(id)
        res.status(200).json(message)
    } catch (error) {
        next(error)
    }
}

