import { Router } from 'express';
import {
  getFavorites,
  addFavorite,
  updateFavorite,
  deleteFavorite
} from '../controllers/favorites.controller.js';

const favoritesRouter = Router();

// GET    /api/favorites        -> lista todos los favoritos
// POST   /api/favorites        -> agrega un nuevo favorito
// PUT    /api/favorites/:id    -> edita la nota de un favorito
// DELETE /api/favorites/:id    -> elimina un favorito
favoritesRouter.get('/', getFavorites);
favoritesRouter.post('/', addFavorite);
favoritesRouter.put('/:id', updateFavorite);
favoritesRouter.delete('/:id', deleteFavorite);

export default favoritesRouter;
