import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Services } from "./components/services";
import Login from "./componentes/Login";
import Recetario from "./componentes/Recetario";
import CreateRecipeModal from './componentes/CreateRecipeModal'; 
import RecipeDetails from './componentes/RecipeDetails'; // Importar la página de detalles de la receta

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [showCreateRecipeModal, setShowCreateRecipeModal] = useState(false); // Controlar el modal globalmente

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  };

  // Función para abrir el modal desde cualquier lugar
  const openCreateRecipeModal = () => {
    setShowCreateRecipeModal(true);
  };

  // Función para cerrar el modal
  const closeCreateRecipeModal = () => {
    setShowCreateRecipeModal(false);
  };

  return (
    <Router>
      <div>
        {/* Pasamos la función para abrir el modal al componente de navegación */}
        <Navigation
          isAuthenticated={isAuthenticated}
          logout={logout}
          username={username}
          openCreateRecipeModal={openCreateRecipeModal}
        />
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
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/recetario" element={<Recetario />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* Nueva ruta para detalles de receta */}
        </Routes>

        {/* Mostrar el modal globalmente si está activado */}
        {showCreateRecipeModal && (
          <CreateRecipeModal onClose={closeCreateRecipeModal} />
        )}
      </div>
    </Router>
  );
};

export default App;
