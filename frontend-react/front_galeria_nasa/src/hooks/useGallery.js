import { useState, useEffect, useRef } from 'react';

const API_URL = 'http://localhost:3000';

const useGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref para evitar múltiples llamadas simultáneas (problema de closures en IntersectionObserver)
  const loadingRef = useRef(false);

  const fetchImages = async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/images?count=6`);

      if (!response.ok) {
        setError('Error al obtener imágenes de la NASA');
        return;
      }

      const data = await response.json();
      setImages((prev) => [...prev, ...data]); // Concatena sin reemplazar
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    fetchImages();
  }, []);

  const loadMore = () => {
    fetchImages();
  };

  return { images, loading, error, loadMore };
};

export default useGallery;
