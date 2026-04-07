function ImageCard({ image, onSaveRequest }) {
  return (
    <div className="image-card">
      {image.media_type === 'image' ? (
        <img src={image.url} alt={image.title} loading="lazy" />
      ) : (
        <iframe src={image.url} title={image.title} allowFullScreen />
      )}
      <div className="image-card-info">
        <h3>{image.title}</h3>
        <p>{image.date}</p>
        <button className="btn" onClick={() => onSaveRequest(image)}>
          Guardar en favoritos
        </button>
      </div>
    </div>
  );
}

export default ImageCard;
