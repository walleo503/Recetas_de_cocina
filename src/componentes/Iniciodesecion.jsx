import React from "react";
import { useNavigate } from "react-router-dom";
import "./";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    // Si la autenticación es exitosa, redirigir al usuario
    navigate("/");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Recordar</label>
          <a href="#">Olvide la contraseña</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>No tienes una cuenta? <a href="#">Registrar</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

