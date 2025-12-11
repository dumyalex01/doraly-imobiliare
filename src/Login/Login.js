import './Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight, FaUser, FaLock, FaEye } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://assess-westminster-informal-ports.trycloudflare.com/api/v1/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        console.log(jwt);
        navigate('/HomeAdmin');
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleGuestLogin = () => {
    navigate('/Home');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <div className={`login-form-small ${showLoginForm ? 'active' : ''}`}>
        <button 
          className="login-toggle-btn"
          onClick={() => setShowLoginForm(!showLoginForm)}
        >
          <FaUser /> {showLoginForm ? '×' : 'Login'}
        </button>
        

        {showLoginForm && (
          <div className="small-form-content">
            <h3>Autentificare</h3>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button className="login-btn-small" onClick={handleLogin}>
              Autentificare
            </button>
            {message && <div className="error-message">{message}</div>}
          </div>
        )}
=======
        <div className="buttons">
          <button id="login" onClick={handleLogin}>Login</button>
          <button id="guest" onClick={handleGuestLogin}>Vezi anunturile</button>
        </div>
      </div>
      <div className="text">
        <h2>Bine ati venit pe site-ul agentiei Doraly!</h2>
        <p className="textClass">Locul in care aveti ocazia sa gasiti cele mai bune oferte</p>
        <p className="textClass">din judetul Arges</p>
>>>>>>> c50d99080c41cbcb101ce7433d083410426881eb
      </div>

      <div className="main-content">
        <div className="text-box">
          <h1>Bine ați venit la Agenția Doraly!</h1>
          <p className="subtitle">Locul unde găsiți cele mai bune oferte din județul Argeș</p>
          
          <div className="features">
            <p><FaEye /> Oferte exclusive</p>
            <p><FaEye /> Consultanță specializată</p>
            <p><FaEye /> Cele mai bune prețuri</p>
          </div>
        </div>

        <button className="main-cta-button" onClick={handleGuestLogin}>
          <span>Vezi anunțuri</span>
          <FaArrowRight className="arrow-icon" />
        </button>

        <div className="alternative-login">
          <p>Sunteți agent imobiliar?</p>
          <button 
            className="agent-login-btn"
            onClick={() => setShowLoginForm(true)}
          >
            Autentificați-vă aici
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;