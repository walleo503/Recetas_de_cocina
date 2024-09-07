import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import Login from "./components/Login/Login";
import Recetario from "./componentes/Recetario";
import Pimientos from "./componentes/RecetasVeganas";
import Arroz from "./componentes/RecetasBajoensodio";  // Importa todos los nuevos componentes de recetas
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header data={landingPageData.Header} />
                <About data={landingPageData.About} />
                <Services data={landingPageData.Services} />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/recetario" element={<Recetario />} />
          <Route path="/pimientos" element={<Pimientos />} />
          <Route path="/arroz" element={<Arroz />} /> {/* Añade una ruta para cada nueva receta */}
          {/* Añadir las demás rutas de las recetas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

