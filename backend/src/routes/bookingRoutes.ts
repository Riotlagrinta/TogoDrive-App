// @ts-nocheck
import { Router } from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate); // Toutes les routes nécessitent un token

router.post('/', createBooking);
router.get('/my-bookings', getMyBookings);

export default router;
