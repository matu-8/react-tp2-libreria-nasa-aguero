import { useState } from 'react';
import FavoriteCard from './FavoriteCard';
import SearchBar from './SearchBar';

function Favorites({ favorites, loading, error, onEdit, onDelete }) {
  const [search, setSearch] = useState('');

  const filtered = favorites.filter((fav) =>
    fav.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="loader">Cargando favoritos...</p>;
  if (error) return <p className="error-msg" style={{ padding: '2rem' }}>Error: {error}</p>;

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />

      {favorites.length === 0 ? (
        <p className="empty-msg">Aún no guardaste ningún favorito.</p>
      ) : filtered.length === 0 ? (
        <p className="empty-msg">No se encontraron favoritos con ese título.</p>
      ) : (
        <div className="favorites-grid">
          {filtered.map((fav) => (
            <FavoriteCard
              key={fav.id}
              favorite={fav}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
