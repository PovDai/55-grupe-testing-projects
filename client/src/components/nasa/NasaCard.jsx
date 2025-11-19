

export  function NasaCard({ apod }) {
  return (
    <div className="card nasa-card shadow-sm mb-4">
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} className="card-img-top nasa-image" />
      ) : (
        <iframe
          title={apod.title}
          src={apod.url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="nasa-video"
        ></iframe>
      )}

      <div className="card-body">
        <h5 className="card-title">{apod.title}</h5>
        <p className="card-text">{apod.explanation}</p>
        <p><strong>Date:</strong> {apod.date}</p>
        {apod.copyright && <p><strong>©</strong> {apod.copyright}</p>}
        {apod.hdurl && (
          <a href={apod.hdurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mt-2">
            View HD
          </a>
        )}
      </div>
    </div>
  );
}
