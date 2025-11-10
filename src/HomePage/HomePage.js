import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [anunturi, setAnunturi] = useState([]);
  const [filteredAnunturi, setFilteredAnunturi] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    zona: "",
    tip: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAnunturi();
  }, []);


  const fetchAnunturi = async () => {
    try {
      const response = await fetch("http://140.245.17.254:8080/api/anunturi");
      const data = await response.json();

    console.log("=== DATELE PRIMITE DE LA SERVER ===");
    console.log("Număr anunțuri:", data.length);
    if (data.length > 0) {
      console.log("Primul anunț:", data[0]);
      console.log("Câmpurile primului anunț:", Object.keys(data[0]));
    }
    console.log("Toate datele:", data);
    console.log("===================================");
      setAnunturi(data);
      setFilteredAnunturi(data);
    } catch (error) {
      console.error("Eroare la încărcarea anunțurilor:", error);
    }
  };

  const applyFilters = useCallback(() => {
  let filtered = [...anunturi];

  if (filters.type) {
    filtered = filtered.filter(
      (anunt) =>
        anunt.type &&
        anunt.type.toLowerCase().includes(filters.type.toLowerCase())
    );
  }

  if (filters.zona) {
    filtered = filtered.filter((anunt) =>
      anunt.zone.toLowerCase().includes(filters.zona.toLowerCase())
    );
  }

  if (filters.tip) {
    const isForRent = filters.tip === "inchiriere";
    filtered = filtered.filter((anunt) => anunt.inchiriere === isForRent);
  }

  setFilteredAnunturi(filtered);
}, [anunturi, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      zona: "",
      tip: "",
    });
  };

  const openAnunt = (id) => {
    if (id != null) navigate(`/anunt/${id}`);
    else console.error("ID invalid:", id);
  };

  const getUniqueValues = (key) => {
    return [...new Set(anunturi.map((anunt) => anunt[key]))].sort();
  };

  useEffect(() => {
  applyFilters();
  }, [applyFilters]);

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>🏠 Anunțuri Imobiliare</h1>
        <p className="subtitle">Cu Doraly, găsești casa visurilor tale</p>
      </div>

      <div className="filters-section">
        <div className="filters-header">
          <h2>🔍 Filtrează anunțurile</h2>
          <button className="clear-filters-btn" onClick={clearFilters}>
            🗑️ Șterge filtre
          </button>
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label>🏠 Tip proprietate</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="filter-select"
            >
              <option value="">Toate tipurile</option>
              <option value="Garsoniera">Garsonieră</option>
              <option value="Apartament 2 camere">Apartament 2 camere</option>
              <option value="Apartament 3 camere">Apartament 3 camere</option>
              <option value="Apartament 4 camere">Apartament 4 camere</option>
              <option value="Teren">Teren</option>
              <option value="Casa">Casă</option>
            </select>
          </div>

          <div className="filter-group">
            <label>📍 Zonă</label>
            <select
              value={filters.zona}
              onChange={(e) => handleFilterChange("zona", e.target.value)}
              className="filter-select"
            >
              <option value="">Toate zonele</option>
              <option value="Pitesti">Pitești</option>
              <option value="Mioveni">Mioveni</option>
              <option value="Stefanesti">Ștefănești</option>
              <option value="Campulung">Câmpulung</option>
              {getUniqueValues("zone")
                .filter(
                  (zone) => !["Pitești", "Mioveni", "Stefanesti", "Campulung"].includes(zone)
                )
                .map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-group">
            <label>🏷️ Tip anunț</label>
            <select
              value={filters.tip}
              onChange={(e) => handleFilterChange("tip", e.target.value)}
              className="filter-select"
            >
              <option value="">Toate anunțurile</option>
              <option value="inchiriere">Închiriere</option>
              <option value="vanzare">Vânzare</option>
            </select>
          </div>
        </div>

        <div className="active-filters">
          {Object.values(filters).some((val) => val !== "") && (
            <>
              <span>Filtre active:</span>
              {filters.type && (
                <span className="filter-tag">
                  🏠 {filters.type}
                  <button onClick={() => handleFilterChange("type", "")}>×</button>
                </span>
              )}
              {filters.zona && (
                <span className="filter-tag">
                  📍 {filters.zona}
                  <button onClick={() => handleFilterChange("zona", "")}>×</button>
                </span>
              )}
              {filters.tip && (
                <span className="filter-tag">
                  🏷️ {filters.tip === "inchiriere" ? "Închiriere" : "Vânzare"}
                  <button onClick={() => handleFilterChange("tip", "")}>×</button>
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className="results-info">
        <p>
          {filteredAnunturi.length === anunturi.length
            ? `🎉 Afișate toate ${anunturi.length} anunțuri`
            : `🔍 ${filteredAnunturi.length} anunțuri găsite din ${anunturi.length}`}
        </p>
      </div>

      <div className="anunturi-grid">
        {filteredAnunturi.length > 0 ? (
          filteredAnunturi.map((anunt) => (
            <div
              key={anunt.id}
              className="anunt-card"
              onClick={() => openAnunt(anunt.id)}
            >
              <div className="anunt-card-image">
                {anunt.images && anunt.images.length > 0 ? (
                  <img
                    src={`http://140.245.17.254:8080${anunt.images[0]}`}
                    alt={anunt.title}
                  />
                ) : (
                  <div className="placeholder-img">🏠 Fără imagine</div>
                )}
                <div className="anunt-badge">
                  {anunt.inchiriere ? "📅 Închiriere" : "💰 Vânzare"}
                </div>
              </div>
              <div className="anunt-card-info">
                <h2>{anunt.title}</h2>
                <p className="anunt-price">{anunt.price} EUR</p>
                <div className="anunt-details">
                  <span>🏠 {anunt.type}</span>
                  <span>📐 {anunt.surface} m²</span>
                  <span>📍 {anunt.zone}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>😔 Nu s-au găsit anunțuri</h3>
            <p>Încearcă să modifici filtrele sau să ștergi toate filtrele</p>
            <button className="clear-filters-btn large" onClick={clearFilters}>
              🗑️ Șterge toate filtrele
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
