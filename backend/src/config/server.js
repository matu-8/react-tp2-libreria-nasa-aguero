import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routerApp from '../routes/server.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir body en formato JSON (POST, PUT)

// Rutas
app.use('/api', routerApp);

export const initialize = () => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};
