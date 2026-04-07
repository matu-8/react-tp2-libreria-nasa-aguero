import { useEffect, useRef } from 'react';
import ImageCard from './ImageCard';

function Gallery({ images, loading, error, loadMore, onSaveRequest }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (error) {
    return <p className="error-msg" style={{ padding: '2rem' }}>Error: {error}</p>;
  }

  return (
    <div>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <ImageCard
            key={`${image.date}-${index}`}
            image={image}
            onSaveRequest={onSaveRequest}
          />
        ))}
      </div>

      <div ref={loaderRef} className="scroll-sentinel">
        {loading && <p className="loader">Cargando imágenes...</p>}
      </div>
    </div>
  );
}

export default Gallery;
