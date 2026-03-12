import { Router } from 'express';
import { createVehicle, getAllVehicles, getMyVehicles } from '../controllers/vehicleController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createVehicleSchema } from '../schemas/vehicleSchema.js';

const router = Router();

// Route publique pour voir tous les véhicules (Catalogue)
router.get('/', getAllVehicles);

// Routes protégées pour les partenaires
router.post('/', authenticate, validate(createVehicleSchema), createVehicle);
router.get('/my-vehicles', authenticate, getMyVehicles);

export default router;
