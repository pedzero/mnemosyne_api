import { Router } from 'express'
import * as ProjectController from '../controllers/project.controller'
import { authenticate } from '../middlewares/auth'
import multer from 'multer';

const router = Router()
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', ProjectController.fetchProjectsHandler)
router.post('/', authenticate, upload.array('images'), ProjectController.createProjectHandler)
router.get('/:id', ProjectController.fetchSingleProjectHandler)
router.put('/:id', authenticate, upload.array('images'), ProjectController.updateProjectHandler)
router.delete('/:id', authenticate, ProjectController.deleteProjectHandler)

export default router