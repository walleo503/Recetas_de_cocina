import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la receta desde la URL

const RecipeDetails = () => {
  const { id } = useParams(); // Obtener el ID de la receta desde la URL
  const [recipe, setRecipe] = useState(null); // Guardar la receta individual
  const [error, setError] = useState('');

  // Efecto para obtener la receta cuando el componente se monta
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data); // Guardar la receta en el estado
      } catch (error) {
        console.error('Error al cargar la receta:', error);
        setError('Error al cargar la receta');
      }
    };

    fetchRecipe();
  }, [id]); // Ejecutar de nuevo si el ID cambia

  if (error) {
    return <p>{error}</p>; // Mostrar el error si ocurre
  }

  // Mostrar un mensaje mientras se cargan los datos
  if (!recipe) {
    return <p>Cargando receta...</p>;
  }

  // Mostrar los detalles de la receta si los datos están cargados
  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={`http://localhost:3001${recipe.image_url}`} alt={recipe.title} />
      <p><strong>Descripción:</strong> {recipe.description}</p>
      <p><strong>Tiempo de preparación:</strong> {recipe.duration} minutos</p>
      <p><strong>Categoría:</strong> {recipe.category}</p>

      <button>Editar</button>
      <button>Eliminar</button>
    </div>
  );
};

export default RecipeDetails;
