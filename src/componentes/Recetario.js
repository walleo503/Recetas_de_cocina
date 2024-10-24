import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir a otra página
import '../componentes/styles.css';

export const Recetario = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  // Obtener recetas desde el backend cuando se monta el componente
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes');
        setRecipes(response.data); // Guardar recetas en el estado
      } catch (error) {
        console.error('Error al cargar las recetas:', error);
        setError('Error al cargar las recetas');
      }
    };

    fetchRecipes();

    // Verificar si el usuario está autenticado al cargar la página
    const loggedUser = localStorage.getItem('isAuthenticated');
    if (loggedUser === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para actualizar la lista de recetas después de crear una receta
  const updateRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      setRecipes(response.data); // Actualizar recetas en el estado
    } catch (error) {
      console.error('Error al actualizar las recetas:', error);
      setError('Error al actualizar las recetas');
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remover del localStorage
    setIsLoggedIn(false);
    alert('Adiós! Has cerrado sesión correctamente.');
  };

  // Función para manejar el clic en una receta
  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`); // Redirigir a la página de detalles de la receta
  };

  return (
    <div className="page-background">
      <div className="header-container">
        <div className="header">
          <h1 className="recetario-title">Recetario</h1>

          {isLoggedIn ? (
            <>
              <input
                type="text"
                placeholder="Buscar receta..."
                className="search-bar"
              />
              
            </>
          ) : (
            <p> </p>
          )}
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar el error si existe */}

      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="recipe-item" 
              onClick={() => handleRecipeClick(recipe.id)} // Redirigir al hacer clic
            >
              <img src={`http://localhost:3001${recipe.image_url}`} alt={recipe.title} />
              <p>{recipe.title}</p>
            </div>
          ))
        ) : (
          <p>No hay recetas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Recetario;
