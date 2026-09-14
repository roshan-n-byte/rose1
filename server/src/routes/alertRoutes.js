import { Router } from 'express'
import { acknowledgeAlert, followUpAlert, getAlert, listAlerts, resolveAlert } from '../controllers/alertController.js'
import { allowRoles, requireAuth } from '../middleware/authMiddleware.js'
const router = Router()
router.get('/', listAlerts)
router.get('/:id', getAlert)
router.patch('/:id/acknowledge', requireAuth, allowRoles('ADMIN', 'WELFARE_OFFICER', 'UNIT_OFFICER'), acknowledgeAlert)
router.patch('/:id/follow-up', requireAuth, allowRoles('ADMIN', 'WELFARE_OFFICER', 'UNIT_OFFICER'), followUpAlert)
router.patch('/:id/resolve', requireAuth, allowRoles('ADMIN', 'WELFARE_OFFICER'), resolveAlert)
export default router
