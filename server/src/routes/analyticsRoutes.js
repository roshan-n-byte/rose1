import { Router } from 'express'
import { getDashboard, getFatigue, getStress, getUnits, getWeekly, getWelfare, getWorkload } from '../controllers/analyticsController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
const router = Router()
router.use(requireAuth)
router.get('/dashboard', getDashboard)
router.get('/stress', getStress)
router.get('/fatigue', getFatigue)
router.get('/workload', getWorkload)
router.get('/welfare', getWelfare)
router.get('/units', getUnits)
router.get('/weekly', getWeekly)
export default router
