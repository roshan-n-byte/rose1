import { Router } from 'express'
import { createCheckin, listCheckins, recentCheckins } from '../controllers/checkinController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { checkinSchema, validate } from '../middleware/validationMiddleware.js'
const router = Router()
router.use(requireAuth)
router.post('/', validate(checkinSchema), createCheckin)
router.get('/recent', recentCheckins)
router.get('/:personnelId', listCheckins)
export default router
