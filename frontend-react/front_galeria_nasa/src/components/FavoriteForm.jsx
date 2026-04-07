import { useState } from 'react';

function FavoriteForm({ image, onSave, onClose }) {
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const result = await onSave({
      title: image.title,
      date: image.date,
      url: image.url,
      hdurl: image.hdurl,
      explanation: image.explanation,
      media_type: image.media_type,
      note,
    });

    if (!result.success) {
      setError(result.msg);
      setSaving(false);
    }
  };

  return (
    <>
      <h3>Guardar en favoritos</h3>
      <p><strong>{image.title}</strong></p>
      <p>{image.date}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nota (opcional):</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escribí una nota sobre esta imagen..."
            rows={3}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Guardando...' : 'Confirmar'}
          </button>
          <button type="button" className="btn" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default FavoriteForm;
