import { Router } from 'express'
import * as ProfileController from '../controllers/profile.controller'

const router = Router()

router.get('/', ProfileController.getProfile)
router.put('/', ProfileController.updateProfile)

export default router
