import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import Login from "./componentes/Login";
import Recetario from "./componentes/Recetario";
import Vegetarianas from "./componentes/RecetasVegetarianas";
import Bajo_Sodio from "./componentes/RecetasBajoensodio";  
import Carne from "./componentes/recetasConCarne";
import Frutas from "./componentes/RecetasConFrutas";
import Legumbres from "./componentes/RecetasConLegumbres";
import Pastas from "./componentes/RecetasConPasta";
import Pescado from "./componentes/RecetasConPescado";
import Pollo from "./componentes/RecetasConPollo";
import Postres from "./componentes/RecetasPostres";
import Vegana from "./componentes/RecetasVeganas";
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
          <Route path="/pimientos" element={<Vegetarianas />} />
          <Route path="/arroz" element={<Bajo_Sodio/>} />
          <Route path="/carne" element={< Carne />} />
          <Route path="/frutas" element={< Frutas />} />   
          <Route path="/legumbres" element={< Legumbres />} /> 
          <Route path="/pastas" element={< Pastas />} />
          <Route path="/pescado" element={< Pescado />} /> 
          <Route path="/pollo" element={< Pollo />} /> 
          <Route path="/postres" element={< Postres />} /> 
          <Route path="/vegana" element={< Vegana />} />  {/* Añade una ruta para cada nueva receta */}
          {/* Añadir las demás rutas de las recetas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

