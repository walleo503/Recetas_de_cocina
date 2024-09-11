import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import Login from "./components/Login/Login";
import Recetario from "./componentes/Recetario";
import Pimientos from "./componentes/RecetasVeganas";
import Arroz from "./componentes/RecetasBajoensodio";  
import Carne from "./componentes/recetasConCarne";
import Frutas from "./componentes/RecetasConFrutas";
import Legumbres from "./componentes/RecetasConLegumbres";
import Pastas from "./componentes/RecetasConPasta";
import Pescado from "./componentes/RecetasConPescado";
import Pollo from "./componentes/RecetasConPollo";
import Postres from "./componentes/RecetasPostres";
import Vegetariana from "./componentes/RecetasVegetarianas";// Importa todos los nuevos componentes de recetas
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
          <Route path="/arroz" element={<Arroz />} />
          <Route path="/carne" element={< Carne />} />
          <Route path="/frutas" element={< Frutas />} />   
          <Route path="/legumbres" element={< Legumbres />} /> 
          <Route path="/pastas" element={< Pastas />} />
          <Route path="/pescado" element={< Pescado />} /> 
          <Route path="/pollo" element={< Pollo />} /> 
          <Route path="/postres" element={< Postres />} /> 
          <Route path="/vegetarianas" element={< Vegetariana />} />  {/* Añade una ruta para cada nueva receta */}
          {/* Añadir las demás rutas de las recetas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

