import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../componentes/styles.css';
import { Navigation } from '../components/navigation';
import axios from 'axios';

import Pimientos from './img/Pimientos.png';
import Arroz from './img/recetadearroz.png';
import Fresas from './img/postredefresa.png';
import Legumbres from './img/Legunbre.png';
import Verduras from './img/ensalada.png';
import Pasta from './img/espagetis.png';
import Pescado from './img/pescadofrito.png';
import Pollo from './img/pechugaalaplancha.png';
import Carne from './img/carneasada.png';
import Postres from './img/crepas.png';

const recipes = [
  { name: 'Recetas vegetarianas', image: Pimientos, link: '/pimientos' },
  { name: 'Recetas bajas en sodio', image: Arroz, link: '/arroz' },
  { name: 'Recetas con frutas', image: Fresas, link: '/fresas' },
  { name: 'Recetas con legumbres', image: Legumbres, link: '/legumbres' },
  { name: 'Recetas veganas', image: Verduras, link: '/verduras' },
  { name: 'Recetas con pasta', image: Pasta, link: '/pasta' },
  { name: 'Recetas con pescado', image: Pescado, link: '/pescado' },
  { name: 'Recetas con pollo', image: Pollo, link: '/pollo' },
  { name: 'Recetas con carne', image: Carne, link: '/carne' },
  { name: 'Recetas de postres', image: Postres, link: '/postres' },
];

export const Recetario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', image: '' });

  useEffect(() => {
    // Envía todas las recetas automáticamente al cargar el componente
    recipes.forEach((recipe) => {
      axios.post('http://localhost:3001/addRecipe', {
        nombre: recipe.name,
        imagen_url: recipe.image,
      });
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNewRecipe = async () => {
    try {
      await axios.post('http://localhost:3001/addRecipeClass', {
        nombre: newRecipe.name,
        imagen_url: newRecipe.image,
      });
      alert('Nueva clase de receta creada');
      setShowModal(false);
    } catch (error) {
      alert('Error al crear nueva clase de receta');
    }
  };

  return (
    <>
      <Navigation />
      <div className="page-background">
        <div className="header-container">
          <div className="header">
            <h1 className="recetario-title">Recetario</h1>
            <input
              type="text"
              placeholder="Buscar receta..."
              className="search-bar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={() => setShowModal(true)}>
              Crear nueva receta
            </button>
          </div>
        </div>

        <div className="recipes-container">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.name} className="recipe-item">
              <Link to={recipe.link}>
                <img src={recipe.image} alt={recipe.name} />
                <p>{recipe.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear nueva clase de receta</h2>
            <input
              type="text"
              placeholder="Nombre de la receta"
              value={newRecipe.name}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={newRecipe.image}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, image: e.target.value })
              }
            />
            <button onClick={handleCreateNewRecipe}>Crear</button>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Recetario;
