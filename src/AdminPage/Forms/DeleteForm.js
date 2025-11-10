import React, { useState, useEffect } from "react";
import "./DeleteForm.css";

function DeleteForm() {
  const [selectedValue, setSelectedValue] = useState("");
  const [anunturi, setAnunturi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnunturi();
  }, []);

  const fetchAnunturi = async () => {
    try {
      const response = await fetch("http://140.245.17.254:8080/api/anunturi");
      const data = await response.json();
      setAnunturi(data);
    } catch (error) {
      console.error("Eroare la încărcarea anunțurilor:", error);
      alert("Eroare la încărcarea anunțurilor!");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!selectedValue) {
      alert("Selectează un anunț înainte de ștergere.");
      return;
    }

    if (!window.confirm(`Ești sigur că vrei să ștergi acest anunț?`)) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`http://140.245.17.254:8080/api/anunturi/${selectedValue}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Anunț șters cu succes!");
        setSelectedValue("");

        fetchAnunturi();
      } else {
        const errorData = await response.text();
        alert(`Eroare la ștergere: ${errorData}`);
      }
    } catch (error) {
      console.error("Eroare la ștergere:", error);
      alert("Eroare la conexiunea cu serverul!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-deleteForm">
      <h1>Șterge anunțul tău</h1>
      <form className="deleteform" onSubmit={handleDelete}>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Selectează un anunț --</option>
          {anunturi.map((anunt) => (
            <option key={anunt.id} value={anunt.id}>
              {anunt.title} - {anunt.price} EUR - {anunt.zone}
            </option>
          ))}
        </select>
        
        <button type="submit" disabled={loading || !selectedValue}>
          {loading ? "Ștergere..." : "Șterge Anunț"}
        </button>
      </form>
      
      {selectedValue && (
        <div className="selected-anunt-info">
          <h3>Detalii anunț selectat:</h3>
          {anunturi
            .filter(anunt => anunt.id === selectedValue)
            .map(anunt => (
              <div key={anunt.id} className="anunt-details">
                <p><strong>Titlu:</strong> {anunt.title}</p>
                <p><strong>Preț:</strong> {anunt.price} EUR</p>
                <p><strong>Zonă:</strong> {anunt.zone}</p>
                <p><strong>Camere:</strong> {anunt.type}</p>
                <p><strong>Suprafață:</strong> {anunt.surface} m²</p>
                <p><strong>Tip:</strong> {anunt.inchiriere ? "Închiriere" : "Vânzare"}</p>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default DeleteForm;