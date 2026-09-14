import { Router } from 'express'
import { createPersonnel, deletePersonnel, getPersonnel, listPersonnel, updatePersonnel } from '../controllers/personnelController.js'
import { allowRoles, requireAuth } from '../middleware/authMiddleware.js'
const router = Router()
router.get('/', listPersonnel)
router.get('/:id', getPersonnel)
router.post('/', requireAuth, allowRoles('ADMIN', 'WELFARE_OFFICER'), createPersonnel)
router.put('/:id', requireAuth, allowRoles('ADMIN', 'WELFARE_OFFICER'), updatePersonnel)
router.delete('/:id', requireAuth, allowRoles('ADMIN'), deletePersonnel)
export default router
