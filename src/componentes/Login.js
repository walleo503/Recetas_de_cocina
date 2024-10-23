import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { username: 'Waldely', password: '12345' },
    { username: 'Mignathan', password: '67890' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      login(user.username); 
      navigate("/"); 
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="options">
            <label>
              <input type="checkbox" /> Recordar
            </label>
            <span className="disabled-link">Olvidé la contraseña</span>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>No tienes una cuenta? <span className="disabled-link">Registrar</span></p>
      </div>
    </div>
  );
};

export default Login;
