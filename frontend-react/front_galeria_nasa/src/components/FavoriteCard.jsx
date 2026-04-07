import { useState } from 'react';

function FavoriteCard({ favorite, onEdit, onDelete }) {
  const [note, setNote] = useState(favorite.note || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNote = async () => {
    setSaving(true);
    setError(null);
    setNoteSaved(false);

    const result = await onEdit(favorite.id, note);

    if (!result.success) {
      setError(result.msg);
    } else {
      setNoteSaved(true);
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const result = await onDelete(favorite.id);

    if (!result.success) {
      setError(result.msg);
      setDeleting(false);
    }
  };

  return (
    <div className="favorite-card">
      {favorite.media_type === 'image' && (
        <img src={favorite.url} alt={favorite.title} />
      )}

      <div className="favorite-card-info">
        <h3>{favorite.title}</h3>
        <p>{favorite.date}</p>

        <div className="form-group">
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteSaved(false);
            }}
            placeholder="Agregar una nota..."
            rows={3}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}
        {noteSaved && <p className="success-msg">Nota guardada ✓</p>}

        <div className="favorite-card-actions">
          <button className="btn" onClick={handleSaveNote} disabled={saving || deleting}>
            {saving ? 'Guardando...' : 'Guardar nota'}
          </button>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting || saving}>
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
