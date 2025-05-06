import { Router } from 'express'
import * as ProjectController from '../controllers/project.controller'
import { authenticate } from '../middlewares/auth'

const router = Router()

router.get('/', authenticate, ProjectController.fetchProjectsHandler)
router.post('/', authenticate, ProjectController.createProjectHandler)
router.get('/:id', authenticate, ProjectController.fetchSingleProjectHandler)
router.put('/:id', authenticate, ProjectController.updateProjectHandler)
router.delete('/:id', authenticate, ProjectController.deleteProjectHandler)

export default router