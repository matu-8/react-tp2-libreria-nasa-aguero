import 'dotenv/config';

const NASA_API_URL = process.env.NASA_API_URL;
const NASA_API_KEY = process.env.NASA_API_KEY;

/**
 * GET /api/images?count=6
 * Obtiene imágenes aleatorias del APOD (Astronomy Picture of the Day) de la NASA.
 */
export const getImages = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 6;
    const url = `${NASA_API_URL}?api_key=${NASA_API_KEY}&count=${count}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ msg: `Error al obtener imágenes de la NASA: ${response.statusText}` });
    }

    const images = await response.json();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};