import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navigation = ({ isAuthenticated, logout, username, openCreateRecipeModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Seguro que deseas cerrar sesión?");
    if (confirmLogout) {
      alert(`Adiós ${username}`);
      logout();
      navigate("/login");
    }
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {isAuthenticated && <span className="navbar-text">Hola, {username}</span>}
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand page-scroll">
            <img
              src="img/logo.svg"
              alt="Logo"
              style={{ width: "30px", marginRight: "10px", display: "inline-block" }}
            />
            FEAST.com
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {location.pathname === "/login" && (
              <li>
                <Link to="/" className="page-scroll">Inicio</Link>
              </li>
            )}

            {!isAuthenticated && location.pathname === "/" && (
              <li>
                <Link to="/login" className="page-scroll">Iniciar Sesión</Link>
              </li>
            )}

            {isAuthenticated && (
              <>
                <li 
                  className="dropdown"
                  onMouseEnter={() => setDropdownVisible(true)} 
                  onMouseLeave={() => setDropdownVisible(false)}
                >
                  <Link to="/recetario" className="page-scroll">
                    Recetario
                  </Link>
                  {dropdownVisible && (
                    <ul className="dropdown-menu" style={{ display: 'block', position: 'absolute' }}>
                      <li>
                        <a onClick={openCreateRecipeModal} style={{ cursor: 'pointer' }}>
                          Crear Receta
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a className="page-scroll" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Cerrar Sesión
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
