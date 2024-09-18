import React from "react";
import './Login.css'; // Aquí colocamos los estilos para el login

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-container">
            <input type="text" placeholder="Username" />
            <span className="icon">&#xf007;</span> {/* Icono de usuario */}
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" />
            <span className="icon">&#xf023;</span> {/* Icono de candado */}
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Recordar
            </label>
            <a href="/">Olvide la contraseña</a>
          </div>
          <button className="login-button">Login</button>
        </form>
        <p>No tienes una cuenta? <a href="/register">Registrar</a></p>
      </div>
    </div>
  );
};

export default Login;
