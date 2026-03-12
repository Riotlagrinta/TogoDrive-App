import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createVehicle = async (req: Request, res: Response) => {
  try {
    // Les données sont déjà validées par le middleware 'validate'
    const vehicleData = req.body;

    const vehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData,
        ownerId: req.user!.userId,
      }
    });

    res.status(201).json({ 
      status: 'success',
      message: "Véhicule ajouté avec succès", 
      data: vehicle 
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error',
      message: "Erreur lors de l'ajout", 
      error: error.message 
    });
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        owner: {
          select: { firstName: true, lastName: true, phone: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      status: 'success',
      data: vehicles
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error',
      message: "Erreur lors de la récupération", 
      error: error.message 
    });
  }
};

export const getMyVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: req.user!.userId }
    });
    res.json({
      status: 'success',
      data: vehicles
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error',
      message: "Erreur lors de la récupération de vos véhicules", 
      error: error.message 
    });
  }
};
