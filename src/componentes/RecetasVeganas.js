import React, { useState } from 'react';
import './recetasbajoensodio.css';
import { Navigation } from '../components/navigation';
import { useNavigate } from 'react-router-dom'; 
import EnsaladaItaliana from './img/imgsodio/ensaladacaprese.png';
import Bebidarosa from './img/imgsodio/bebida.png';
import PandeBana from './img/imgsodio/PanBanana.png';
import Usuariologo from "./img/usuario1.png";
import Usuariologo2 from "./img/usuario2.png";


const recipes = [
  {
    name: 'Ensalada Italiana',
    user: {
      name: 'Lucía Martínez',
      email: 'lucia@example.com',
      datePublished: '2024-09-01'
    },
    image: EnsaladaItaliana,
    link: '/ensaladaItaliana',
    ingredients: [
      '200g de mozzarella fresca', 
      '4 tomates maduros', 
      'Hojas de albahaca fresca', 
      'Aceite de oliva extra virgen', 
      'Vinagre balsámico (opcional)', 
      'Pimienta negra recién molida'
    ],
    steps: [
      'Cortar la mozzarella y los tomates en rodajas.',
      'Alternar las rodajas de mozzarella y tomate en un plato.',
      'Añadir hojas de albahaca entre las rodajas.',
      'Rociar con aceite de oliva y vinagre balsámico si se desea.',
      'Sazonar con pimienta negra al gusto.'
    ],
    timeCategory: 'Hasta 30 minutos',
    comments: [
      {
        user: {
          name: 'Carlos Perez',
          image: Usuariologo
        },
        date: '2024-09-02', // fecha del comentario
        text: 'Me encanta esta receta, es súper refrescante y fácil de hacer.'
      },
    ]
  },
  {
    name: 'Agua fresca de sandía y arándanos rojos',
    user: {
      name: 'Lucía Martínez',
      email: 'lucia@example.com',
      datePublished: '2024-09-01'
    },
    image: Bebidarosa,
    link: '/bebidarosa',
    ingredients: [
      '2 1/2 libras de sandía sin semillas', 
      '1/4 de taza de jugo de lima fresco', 
      '1 taza de jugo de arándanos rojos', 
      '1 lima cortada en rodajas'
    ],
    steps: [
      'Licúa la sandía hasta obtener una consistencia suave.', 
      'Pasa el puré por un tamiz fino para eliminar la pulpa.', 
      'Añade jugos de arándano y lima y refrigera hasta enfriar.', 
      'Sirve con rodajas de lima.'
    ],
    timeCategory: 'Hasta 45 minutos',
    comments: [
      {
        user: {
          name: 'Carlos Perez',
          image: Usuariologo2
        },
        date: '2024-09-02', // fecha del comentario
        text: 'Me encanta esta receta, es súper refrescante y fácil de hacer.'
      },
    ],
  },
  {
    name: 'Pan de banana integral',
    user: {
      name: 'Lucía Martínez',
      email: 'lucia@example.com',
      datePublished: '2024-09-01'
    },  
    image: PandeBana,
    link: '/pandebanana',
    ingredients: [
      '1/2 taza de harina de arroz integral', 
      '1/2 taza de harina de amaranto', 
      '1/2 taza de harina de tapioca', 
      '1/2 de taza de harina de mijo', 
      '1/2 taza de harina de quinua', 
      '1 cucharadita de bicarbonato de sodio', 
      '2 tazas de puré de banana'
    ],
    steps: [
      'Precalentar el horno a 350°F.', 
      'Mezclar los ingredientes secos.', 
      'Añadir los húmedos y mezclar bien.', 
      'Hornear durante 50-60 minutos.'
    ],
    timeCategory: 'Hasta 1 hora',
    comments: [
      {
        user: {
          name: 'Carlos Perez',
          image: Usuariologo
        },
        date: '2024-09-02', // fecha del comentario
        text: 'Me encanta esta receta, es súper refrescante y fácil de hacer.'
      },
    ],
  },
];

export const Recetasveganas    = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(''); // Para manejar los comentarios nuevos
  const [isFavorite, setIsFavorite] = useState(false); // Estado para manejar favoritos
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowComments(false); 
    setNewComment(''); // Reiniciar comentario al abrir modal
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const toggleCommentsView = () => {
    setShowComments(!showComments);
  };

  const addComment = () => {
    if (newComment.trim() !== '' && selectedRecipe) {
      selectedRecipe.comments.push(newComment); // Añadir comentario a la receta seleccionada
      setNewComment(''); // Limpiar campo de comentario
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchSearchTerm = recipe.name.toLowerCase().includes(searchTerm);
    const matchTime = selectedTime === '' || recipe.timeCategory === selectedTime;
    return matchSearchTerm && matchTime;
  });

  return (
    <>
      <Navigation />
      <div className="page-background">
        <div className="header-container">
          <header className="header">
            <h1>Recetas Veganas</h1>
            <input
              type="text"
              placeholder="Buscar recetas..."
              className="search-bar"
              onChange={handleSearchChange}
            />
            <select onChange={handleTimeChange} className="time-filter">
              <option value="">Todos los tiempos</option>
              <option value="Hasta 30 minutos">Hasta 30 minutos</option>
              <option value="Hasta 45 minutos">Hasta 45 minutos</option>
              <option value="Hasta 1 hora">Hasta 1 hora</option>
            </select>
            <button onClick={() => navigate(-1)} className="back-button">
              Regresar
            </button>
          </header>
        </div>
        <div className="recipes-container">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.name} 
              className="recipe-item"
              onClick={() => openModal(recipe)}
            >
              <img src={recipe.image} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
        {selectedRecipe && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {showComments ? (
                <div>
                  <h2>Comentarios</h2>
                  {selectedRecipe.comments.length > 0 ? (
                  <ul>
                    {selectedRecipe.comments.map((comment, index) => (
                      <li key={index} className="comment">
                        <div className="comment-header">
                          <img src={comment.user.image} alt={comment.user.name} className="user-image" />
                          <div>
                            <p><strong>{comment.user.name}</strong></p>
                            <p>{comment.date}</p> {/* Mostrar la fecha del comentario */}
                          </div>
                        </div>
                        <p>{comment.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                )}

                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                  />
                  <button onClick={addComment}>Publicar comentario</button>
                </div>
              ) : (
                <div>
                  <h2>{selectedRecipe.name}</h2>
                  <h3>Publicado por:</h3>
                    <p><strong>{selectedRecipe.user.name}</strong> ({selectedRecipe.user.email})</p>
                    <p>Fecha de publicación: {selectedRecipe.user.datePublished}</p>

                    <h3>Ingredientes:</h3>
                    <ul>
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>

                  <h3>Ingredientes:</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <h3>Pasos:</h3>
                  <ol>
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="modal-buttons">
                  <button onClick={toggleCommentsView}>
                    {showComments ? 'Ver Ingredientes/Pasos' : 'Ver Comentarios'}
                  </button>

                  <button onClick={toggleFavorite} className="favorite-button">
                    {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                  </button>

                  <button onClick={closeModal}>Cerrar</button>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


export default Recetasveganas  ;