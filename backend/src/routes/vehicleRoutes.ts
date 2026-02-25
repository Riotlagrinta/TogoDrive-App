// @ts-nocheck
import { Router } from 'express';
import { createVehicle, getAllVehicles, getMyVehicles } from '../controllers/vehicleController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

// Route publique pour voir tous les véhicules (Catalogue)
router.get('/', getAllVehicles);

// Routes protégées pour les partenaires
router.post('/', authenticate, createVehicle);
router.get('/my-vehicles', authenticate, getMyVehicles);

export default router;
