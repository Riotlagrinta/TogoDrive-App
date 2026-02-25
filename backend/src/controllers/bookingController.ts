// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const bookingSchema = z.object({
  vehicleId: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const createBooking = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = bookingSchema.parse(req.body);
    
    // 1. Récupérer le véhicule pour avoir son prix
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    // 2. Calculer la durée et le montant total
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalAmount = diffDays * vehicle.pricePerDay;

    // 3. Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        startDate: start,
        endDate: end,
        totalAmount,
        userId: req.user.userId,
        vehicleId,
      },
      include: {
        vehicle: true
      }
    });

    res.status(201).json({ message: "Réservation effectuée avec succès", booking });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la réservation", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.userId },
      include: {
        vehicle: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
};
