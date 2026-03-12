import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      status: 'error',
      message: "Accès refusé. Token manquant." 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      status: 'error',
      message: "Token invalide ou expiré." 
    });
  }
};

// Middleware pour vérifier les rôles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error',
        message: "Non authentifié" 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Accès interdit. Votre rôle (${req.user.role}) n'a pas les permissions nécessaires.`
      });
    }

    next();
  };
};
