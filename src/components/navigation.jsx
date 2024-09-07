import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
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
          <Link to="/recetario" className="navbar-brand page-scroll">
            <img
              src="img/logo.svg" 
              alt="Logo"
              style={{ width: "30px", marginRight: "10px", display: "inline-block" }}
            />
            FEAST.com
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/#about" className="page-scroll">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/#services" className="page-scroll">
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/login" className="page-scroll">
                Login
              </Link>
            </li>
            <li>
              <Link to="/recetario" className="page-scroll">
                Recetario
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className="page-scroll">
                Favoritos
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};
