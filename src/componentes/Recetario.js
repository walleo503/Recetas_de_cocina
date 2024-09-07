import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../componentes/styles.css';
import { Navigation } from '../components/navigation';

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    </>
  );
};

export default Recetario;
