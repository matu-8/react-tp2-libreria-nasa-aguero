import { useState } from 'react';
import useFavorites from './hooks/useFavorites';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import FavoriteForm from './components/FavoriteForm';

function App() {
  const [vista, setVista] = useState('galeria');
  const [selectedImage, setSelectedImage] = useState(null);
  const { favorites, loading, error, addFavorite, editNote, removeFavorite } = useFavorites();

  const handleSaveRequest = (image) => {
    setSelectedImage(image);
  };

  const handleConfirmSave = async (imageData) => {
    const result = await addFavorite(imageData);
    if (result.success) {
      setSelectedImage(null);
    }
    return result;
  };

  const handleCloseForm = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <h1> Galería NASA APOD</h1>
      </header>

      {/* Barra de navegación */}
      <nav>
        <button
          className={vista === 'galeria' ? 'active' : ''}
          onClick={() => setVista('galeria')}
        >
          Galería
        </button>
        <button
          className={vista === 'favoritos' ? 'active' : ''}
          onClick={() => setVista('favoritos')}
        >
          Mis Favoritos ({favorites.length})
        </button>
      </nav>

      {/* Modal — se abre al presionar "Guardar en favoritos" */}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <FavoriteForm
              image={selectedImage}
              onSave={handleConfirmSave}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Vistas */}
      {vista === 'galeria' && (
        <Gallery onSaveRequest={handleSaveRequest} />
      )}

      {vista === 'favoritos' && (
        <Favorites
          favorites={favorites}
          loading={loading}
          error={error}
          onEdit={editNote}
          onDelete={removeFavorite}
        />
      )}
    </div>
  );
}

export default App;
