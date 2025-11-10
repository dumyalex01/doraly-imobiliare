import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AnuntDetails.css";

function AnuntDetails() {
  const { id } = useParams();
  const numericId = Number(id);
  const [anunt, setAnunt] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const response = await fetch("https://assess-westminster-informal-ports.trycloudflare.com/api/anunturi");
        const data = await response.json();
        const found = data.find(a => a.id === numericId);
        setAnunt(found);
      } catch (error) {
        console.error("Eroare la încărcarea anunțului:", error);
      }
    };
    fetchAnunt();
  }, [numericId]);

  if (!anunt) return <p className="loading">✨ Se încarcă anunțul...</p>;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? anunt.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === anunt.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="anunt-details-wrapper">
      <button onClick={() => navigate(-1)} className="btn-back">
        <span>⬅</span> Înapoi la listă
      </button>

      <div className="anunt-main-card">
        <div className="anunt-carousel">
          {anunt.images.length > 0 ? (
            <>
              <button className="carousel-btn left" onClick={prevImage}>◀</button>
              <img
                src={`https://assess-westminster-informal-ports.trycloudflare.com${anunt.images[currentIndex]}`}
                alt={`img-${currentIndex}`}
                className="carousel-main-img"
                onClick={() => setLightboxOpen(true)}
              />
              <button className="carousel-btn right" onClick={nextImage}>▶</button>
            </>
          ) : (
            <div className="carousel-placeholder">
              📷 Nu există imagini
            </div>
          )}

          {anunt.images.length > 1 && (
            <div className="carousel-thumbs">
              {anunt.images.map((img, idx) => {
                const src = `https://assess-westminster-informal-ports.trycloudflare.com${img}`;
                return (
                  <img
                    key={idx}
                    src={src}
                    alt={`thumb-${idx}`}
                    className={`thumb-img ${idx === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="anunt-info-container">
          <h1 className="anunt-title">{anunt.title}</h1>
          <p className="anunt-price">{anunt.price} EUR</p>

          <div className="anunt-details-grid">
            <p><strong>📍 Zona</strong> {anunt.zone}</p>
            <p><strong>🚪 Tip locuinta</strong> {anunt.type}</p>
            <p><strong>📐 Suprafață</strong> {anunt.surface} m²</p>
            <p><strong>🏷️ Tip</strong> {anunt.inchiriere ? "Închiriere" : "Vânzare"}</p>
          </div>

          <div className="anunt-description">
            <strong>📖 Descriere:</strong>
            <div className="description-text">
              {anunt.descript}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={() => setLightboxOpen(false)}>
          <img 
            src={`https://assess-westminster-informal-ports.trycloudflare.com${anunt.images[currentIndex]}`} 
            alt="Zoom" 
            className="lightbox-img"
          />
        </div>
      )}
    </div>
  );
}

export default AnuntDetails;