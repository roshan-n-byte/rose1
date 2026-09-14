import { Router } from 'express'
import { createPrediction, listPredictions } from '../controllers/predictionController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
const router = Router()
router.use(requireAuth)
router.post('/', createPrediction)
router.get('/:personnelId', listPredictions)
export default router
