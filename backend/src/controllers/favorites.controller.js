import Favorite from '../models/Favorite.js';

/**
 * GET /api/favorites
 * Retorna todos los favoritos guardados en la base de datos.
 */
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    //En caso de no haber favoritos, se manda este mensaje
    favorites.length === 0 ?
      res.status(200).json({ msg: "Aun no se han guardado favoritos" }) :
      res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

/**
 * POST /api/favorites
 * Agrega una imagen a favoritos en la base de datos.
 * Body esperado: { title, date, url, hdurl, explanation, media_type }
 */
export const addFavorite = async (req, res) => {
  try {
    const { title, date, url, hdurl, explanation, media_type } = req.body;

    if (!url || !title) {
      return res.status(400).json({ msg: 'Los campos title y url son requeridos' });
    }

    const newFavorite = await Favorite.create({
      title,
      date,
      url,
      hdurl,
      explanation,
      media_type,
      note: '',
    });

    res.status(201).json({ msg: 'Imagen agregada a favoritos', favorite: newFavorite });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

/**
 * PUT /api/favorites/:id
 * Edita la nota de un favorito en la base de datos.
 * Body esperado: { note }
 */
export const updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const favorite = await Favorite.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ msg: 'Favorito no encontrado' });
    }

    favorite.note = note;
    await favorite.save();

    res.status(200).json({ msg: 'Nota actualizada', favorite });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

/**
 * DELETE /api/favorites/:id
 * Elimina un favorito de la base de datos.
 */
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ msg: 'Favorito no encontrado' });
    }

    await favorite.destroy();
    res.status(200).json({ msg: 'Favorito eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
