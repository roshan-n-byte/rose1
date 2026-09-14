import { Router } from 'express'
import { queryAssistant } from '../controllers/assistantController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
const router = Router()
router.use(requireAuth)
router.post('/query', queryAssistant)
export default router
