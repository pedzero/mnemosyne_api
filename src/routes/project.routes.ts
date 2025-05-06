import { Router } from 'express'
import * as ProjectController from '../controllers/project.controller'
import { authenticate } from '../middlewares/auth'

const router = Router()

router.get('/', authenticate, ProjectController.fetchProjectsHandler)
router.post('/', authenticate, ProjectController.createProjectHandler)
// GET      /projects/:id
// PUT      /projects/:id
// DELETE   /projects:id

export default router