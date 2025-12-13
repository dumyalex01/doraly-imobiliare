
import React from 'react';
import { FaFacebook, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const companyInfo = {
    name: "Agenția Doraly",
    phone1: "+40 123 456 789",
    phone2: "+40 987 654 321",
    email: "contact@doraly.ro",
    facebook: "https://www.facebook.com/doraly.imobiliaremioveni",
    address: "Bloc v3, Strada 7 Septembrie 1485 5, Mioveni 115400",
    schedule: "Luni - Vineri: 9:00 - 18:00 | Sâmbătă: 10:00 - 14:00"
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3 className="footer-title">Contactează-ne</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone className="footer-icon" />
              <a href={`tel:${companyInfo.phone1}`} className="footer-link">
                {companyInfo.phone1}
              </a>
            </div>
            <div className="contact-item">
              <FaPhone className="footer-icon" />
              <a href={`tel:${companyInfo.phone2}`} className="footer-link">
                {companyInfo.phone2}
              </a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="footer-icon" />
              <a href={`mailto:${companyInfo.email}`} className="footer-link">
                {companyInfo.email}
              </a>
            </div>
            <div className="contact-item">
              <FaClock className="footer-icon" />
              <span>{companyInfo.schedule}</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Urmărește-ne</h3>
          <div className="social-links">
            <a 
              href={companyInfo.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <FaFacebook className="social-icon" />
              <span>Facebook</span>
            </a>
            <a 
              href={companyInfo.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FaInstagram className="social-icon" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Locație</h3>
          <div className="location-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="footer-icon" />
              <span>{companyInfo.address}</span>
            </div>
            

            <div className="map-container">
              <iframe
                title="Locația Agenției Doraly"
                width="100%"
                height="200"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=24.8500,44.8500,24.8700,44.8700&layer=mapnik&marker=44.86,24.86"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
              />
              <br/>
              <small>
                <a 
                  href="https://www.openstreetmap.org/?mlat=44.86&mlon=24.86#map=15/44.86/24.86"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vezi hartă mai mare
                </a>
              </small>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {companyInfo.name}. Toate drepturile rezervate.</p>
        <p className="footer-slogan">🏠 Cu Doraly, găsești casa visurilor tale în Argeș!</p>
      </div>
    </footer>
  );
};

export default Footer;