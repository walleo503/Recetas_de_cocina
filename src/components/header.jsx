import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {"Sabor en cada receta, magia en cada plato."}
                  <span></span>
                </h1>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Saber más
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};