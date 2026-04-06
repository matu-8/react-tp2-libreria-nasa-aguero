import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './database.js';
import routerApp from '../routes/server.route.js';
import favoritesRouter from '../routes/favorites.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routerApp);
app.use('/api/favorites', favoritesRouter);

export const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('>> Conexión a MySQL establecida correctamente');

    await sequelize.sync();
    console.log('>> Tablas sincronizadas con la base de datos');

    app.listen(PORT, () => {
      console.log(`>>> Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('>>>! Error al conectar con la base de datos:', error.message);
  }
};
