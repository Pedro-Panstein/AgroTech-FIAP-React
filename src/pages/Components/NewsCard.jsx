function NewsCard({ image, title, meta, text }) {
  return (
    <div className="card h-100 rounded-3 p-3 bg-tertiary-opacity news-card">
      <img src={image} className="card-img" alt={title} />
      <div className="card-body">
        <h5 className="card-title fw-bold fs-4">{title}</h5>
        <p className="card-meta mb-2">
          <small className="text-muted">{meta}</small>
        </p>
        <p className="card-text">{text}</p>
        <a href="#" className="stretched-link" aria-label={`Ler mais sobre ${title}`}></a>
      </div>
    </div>
  );
}

export default NewsCard;