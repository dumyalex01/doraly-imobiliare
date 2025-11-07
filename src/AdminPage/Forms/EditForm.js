import React, { useState, useEffect } from "react";
import "./EditForm.css";

function EditForm() {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    descript: "",
    surface: "",
    zone: "",
    type: "Garsoniera", // ✅ schimbat din room_number în type
    inchiriere: false,
    price: "",
  });
  const [images, setImages] = useState([]);

  // 🔹 Preluăm toate anunțurile din backend
  useEffect(() => {
    const fetchAds = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/anunturi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAds(data);
    };
    fetchAds();
  }, []);

  // 🔹 Când selectezi un anunț, populăm formularul
  const handleSelect = (e) => {
    const id = e.target.value;
    const ad = ads.find((a) => a.id === parseInt(id));
    setSelectedAd(ad);
    if (ad) {
      setFormData({
        title: ad.title,
        descript: ad.descript,
        surface: ad.surface,
        zone: ad.zone,
        type: ad.type, 
        inchiriere: ad.inchiriere,
        price: ad.price,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAd) return alert("Selectează un anunț!");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((file) => data.append("images", file));

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/anunturi/${selectedAd.id}`,
        {
          method: "PUT",
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        alert("✅ Anunț actualizat cu succes!");
      } else {
        alert("❌ Eroare la actualizare!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Eroare de rețea!");
    }
  };

  return (
    <div className="container-editForm">
      <h1>✏️ Editați anunțul</h1>

      <div className="select-container">
        <select onChange={handleSelect}>
          <option value="">-- Selectează un anunț --</option>
          {ads.map((ad) => (
            <option key={ad.id} value={ad.id}>
              {ad.title} ({ad.zone})
            </option>
          ))}
        </select>
      </div>

      {selectedAd && (
        <form className="form-edit" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titlu:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descriere:</label>
            <textarea
              name="descript"
              value={formData.descript}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Suprafață (m²):</label>
            <input
              type="number"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Zonă:</label>
            <select
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              required
            >
              <option value="Pitesti">Pitești</option>
              <option value="Mioveni">Mioveni</option>
              <option value="Stefanesti">Ștefănești</option>
              <option value="Campulung">Câmpulung</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tip proprietate:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Garsoniera">Garsonieră</option>
              <option value="Apartament 2 camere">Apartament 2 camere</option>
              <option value="Apartament 3 camere">Apartament 3 camere</option>
              <option value="Apartament 4 camere">Apartament 4 camere</option>
              <option value="Teren">Teren</option>
              <option value="Casa">Casă</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="inchiriere"
                checked={formData.inchiriere}
                onChange={handleChange}
              />
              Este pentru închiriere
            </label>
          </div>

          <div className="form-group">
            <label>Preț (EUR):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Imagini noi (opțional):</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="btn-submit">
            Salvează modificările
          </button>
        </form>
      )}
    </div>
  );
}

export default EditForm;
