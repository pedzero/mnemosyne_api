import { Router } from 'express'
import * as ProfileController from '../controllers/profile.controller'
import { authenticate } from '../middlewares/auth'

const router = Router()

router.get('/', ProfileController.getProfile)
router.put('/', authenticate, ProfileController.updateProfile)

export default router
