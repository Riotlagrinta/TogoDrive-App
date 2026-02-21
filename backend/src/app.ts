import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes de test
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API TogoDrive 🚗💨",
    status: "En ligne",
    version: "1.0.0"
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

export default app;
