import { Router } from 'express';
import { getImages } from '../controllers/images.controller.js';

const routerApp = Router();

// GET /api/images?count=6  -> Obtiene imágenes aleatorias del APOD de la NASA
routerApp.get('/images', getImages);

export default routerApp;