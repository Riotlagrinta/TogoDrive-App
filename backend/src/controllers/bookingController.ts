// @ts-nocheck
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPartnerReceivedBookings = async (req, res) => {
  try {
    // On cherche les réservations liées aux véhicules possédés par l'utilisateur connecté
    const bookings = await prisma.booking.findMany({
      where: {
        vehicle: {
          ownerId: req.user.userId
        }
      },
      include: {
        vehicle: true,
        user: {
          select: { firstName: true, lastName: true, phone: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
};
