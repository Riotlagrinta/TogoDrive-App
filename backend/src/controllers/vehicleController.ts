// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const vehicleSchema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  pricePerDay: z.number().positive("Le prix doit être positif"),
  type: z.enum(['SEDAN', 'SUV', 'HATCHBACK', 'PICKUP', 'VAN', 'MOTORCYCLE']),
  location: z.string().optional(),
});

export const createVehicle = async (req, res) => {
  try {
    const validatedData = vehicleSchema.parse(req.body);
    
    const vehicle = await prisma.vehicle.create({
      data: {
        ...validatedData,
        ownerId: req.user.userId,
      }
    });

    res.status(201).json({ message: "Véhicule ajouté avec succès", vehicle });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: error.message });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        owner: {
          select: { firstName: true, lastName: true, phone: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
  }
};

export const getMyVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: req.user.userId }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
};
