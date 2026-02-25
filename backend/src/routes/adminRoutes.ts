// @ts-nocheck
import { Router } from 'express';
import { getPendingPartners, validatePartner } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

// Toutes les routes admin nécessitent d'être authentifié ET d'être ADMIN
router.use(authenticate, authorize('ADMIN'));

router.get('/pending-partners', getPendingPartners);
router.post('/validate-partner', validatePartner);

export default router;
