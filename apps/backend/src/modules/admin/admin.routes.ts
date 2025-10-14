import { Router } from 'express'
import { dashboard } from './admin.controller.js'
import { authGuard } from '../auth/auth.middleware.js'
import { roleGuard } from '../../middlewares/roleGuard.js'

const router = Router()
router.get('/dashboard', authGuard, roleGuard(['ADMIN']), dashboard)
export default router
