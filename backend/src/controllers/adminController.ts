// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPendingPartners = async (req, res) => {
  try {
    const partners = await prisma.user.findMany({
      where: { role: 'PARTNER', status: 'PENDING' },
      orderBy: { createdAt: 'desc' }
    });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
};

export const validatePartner = async (req, res) => {
  try {
    const { userId, action } = req.body; // action: 'ACTIVE' or 'REJECTED'
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: action }
    });

    res.json({ message: `Partenaire ${action === 'ACTIVE' ? 'validé' : 'rejeté'} avec succès`, user });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
};
