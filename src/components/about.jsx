
import React from "react";

export const About = (props) => {
  return (

    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.webp" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Sobre Nosotros</h2>
              <p style={{ textAlign: "justify" }}>
                "En Feast, creemos que la cocina es mucho más que solo preparar alimentos; es una forma de conectar, celebrar y crear momentos memorables. Nuestra pasión por la gastronomía nos inspira a compartir recetas deliciosas, fáciles de seguir y llenas de sabor, para que tanto principiantes como expertos puedan disfrutar de la magia de cocinar en casa.

                Desde platos tradicionales hasta creaciones innovadoras, en Feast encontrarás una amplia variedad de recetas que se adaptan a todos los gustos y ocasiones.               </p>
              <h3>¿Por qué elegirnos?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {"✓ Recetas fáciles"} <br></br> {"✓ Variedad"} <br></br> {"✓ Ingredientes Accesibles"} <br></br> {"✓ Innovación culinaria"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {"✓ Comunidad activa"} <br></br> {"✓ Consejos prácticos"} <br></br> {"✓ Calidad garantizada"} <br></br> {"✓ Amor por la cocina"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};