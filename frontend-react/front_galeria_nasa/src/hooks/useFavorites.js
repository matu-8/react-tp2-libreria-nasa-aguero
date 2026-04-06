import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carga inicial de favoritos desde el backend
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/api/favorites`);

        if (!response.ok) {
          setError('Error al cargar favoritos');
          return;
        }

        const data = await response.json();
        // El backend retorna un array o un objeto con msg si está vacío
        setFavorites(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('No se pudo conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // POST — Agrega un favorito a la base de datos
  const addFavorite = async (imageData) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData),
      });

      if (!response.ok) {
        return { success: false, msg: 'Error al guardar en favoritos' };
      }

      const data = await response.json();
      setFavorites((prev) => [...prev, data.favorite]);
      return { success: true };
    } catch (err) {
      return { success: false, msg: 'Error de conexión con el servidor' };
    }
  };

  // PUT — Edita la nota de un favorito
  const editNote = async (id, note) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });

      if (!response.ok) {
        return { success: false, msg: 'Error al actualizar la nota' };
      }

      const data = await response.json();
      setFavorites((prev) =>
        prev.map((fav) => (fav.id === id ? data.favorite : fav))
      );
      return { success: true };
    } catch (err) {
      return { success: false, msg: 'Error de conexión con el servidor' };
    }
  };

  // DELETE — Elimina un favorito
  const removeFavorite = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return { success: false, msg: 'Error al eliminar favorito' };
      }

      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, msg: 'Error de conexión con el servidor' };
    }
  };

  return { favorites, loading, error, addFavorite, editNote, removeFavorite };
};

export default useFavorites;
