import "./AddForm.css";
import { useState } from "react";

const link = "https://assess-westminster-informal-ports.trycloudflare.com"

function AddForm({ showHeader = true }) {
  const [formData, setFormData] = useState({
    title: "",
    descript: "",
    surface: "",
    zone: "Pitesti",
    inchiriere: false,
    price: "",
    type: "Garsoniera"
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    
    images.forEach((file) => data.append("images", file));

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://assess-westminster-informal-ports.trycloudflare.com/api/anunturi", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("✅ Anunț trimis cu succes!");
        setFormData({
          title: "",
          descript: "",
          surface: "",
          zone: "Pitesti",
          inchiriere: false,
          price: "",
          type: "Garsoniera"
        });
        setImages([]);
      } else {
        const errorText = await response.text();
        alert(`❌ Eroare la trimitere: ${errorText}`);
      }
    } catch (error) {
      console.error("Eroare:", error);
      alert("❌ Eroare de rețea!");
    }
  };

  return (
    <div className="container-addForm">
      {showHeader && <h1>📸 Adaugă anunțul tău</h1>}
      <form className="form-add" onSubmit={handleSubmit}>
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
          <select name="zone" value={formData.zone} onChange={handleChange}>
            <option value="Pitesti">Pitești</option>
            <option value="Mioveni">Mioveni</option>
            <option value="Stefanesti">Ștefănești</option>
            <option value="Campulung">Câmpulung</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tip proprietate:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
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
          <label>Imagini:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn-submit">
          Publică anunțul
        </button>
      </form>
    </div>
  );
}

export default AddForm;