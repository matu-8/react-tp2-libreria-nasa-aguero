import { useState } from 'react';

// Componente de ítem de favorito con edición de nota (PUT) y eliminación (DELETE)
function FavoriteCard({ favorite, onEdit, onDelete }) {
  const [note, setNote] = useState(favorite.note || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [noteSaved, setNoteSaved] = useState(false);

  //metodo PUT (edita y guarda la nota)
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
    // Si success: true, el componente desaparece al actualizarse el estado en el hook
  };

  return (
    <div>
      {favorite.media_type === 'image' && (
        <img src={favorite.url} alt={favorite.title} />
      )}

      <h3>{favorite.title}</h3>
      <p>{favorite.date}</p>

      <textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          setNoteSaved(false);
        }}
        placeholder="Agregar una nota..."
        rows={3}
      />

      {error && <p>Error: {error}</p>}
      {noteSaved && <p>Nota guardada!</p>}

      <button onClick={handleSaveNote} disabled={saving || deleting}>
        {saving ? 'Guardando...' : 'Guardar nota'}
      </button>

      <button onClick={handleDelete} disabled={deleting || saving}>
        {deleting ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  );
}

export default FavoriteCard;
