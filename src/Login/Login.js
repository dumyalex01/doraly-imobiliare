import './Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.clear();
  })

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://assess-westminster-informal-ports.trycloudflare.com/api/v1/login', {
        username,
        password,
      });

      if (response.status === 200) {

        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        localStorage.setItem("message",message)
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

  return (
    <div className="container">
      <div className="containerLogin">
        <div className="hdr">
          <h1>Login</h1>
        </div>
        <div className="nameContainer">
          <div className="iconName"></div>
          <div className="input">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="passwordContainer">
          <div className="iconPassword"></div>
          <div className="input">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div className="buttons">
          <button id="login" onClick={handleLogin}>Login</button>
          <button id="guest" onClick={handleGuestLogin}>Vezi anunturile</button>
        </div>
      </div>
      <div className="text">
        <h2>Bine ati venit pe site-ul agentiei Doraly!</h2>
        <p className="textClass">Locul in care aveti ocazia sa gasiti cele mai bune oferte</p>
        <p className="textClass">din judetul Arges</p>
      </div>

    </div>
  );
}

export default Login;
