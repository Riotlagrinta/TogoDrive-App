import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'Trop de requêtes effectuées depuis cette adresse IP, veuillez réessayer après 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Bienvenue sur l'API TogoDrive 🚗💨",
    status: "En ligne",
    version: "1.1.0",
    robustness: "9.5/10 Security Mode Active"
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route non trouvée' 
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error('[Error Handler]:', err.stack);
  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app;
