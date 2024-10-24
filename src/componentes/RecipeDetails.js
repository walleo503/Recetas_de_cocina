import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './RecipeDetails.css'


const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Cambiar useHistory por useNavigate
  const [recipe, setRecipe] = useState(null); 
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    category: '',
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data);
        setFormData({
          title: response.data.title,
          DESCRIPTION: response.data.DESCRIPTION,
          duration: response.data.duration,
          category: response.data.category,
        });
      } catch (error) {
        console.error('Error al cargar la receta:', error);
        setError('Error al cargar la receta');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/recipes/${id}`, formData);
      setIsEditing(false);
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error al actualizar la receta:', error);
      setError('Error al actualizar la receta');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta receta?');
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:3001/recipes/${id}`);
          alert('Receta eliminada con éxito');
          navigate('/recetario'); // Redirige al recetario después de eliminar
        } catch (error) {
          console.error('Error al eliminar la receta:', error);
          setError('Error al eliminar la receta');
        }
      }
  };


  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Cargando receta...</p>;
  }


  return (
    <div>
      <h1>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{ backgroundColor: '#f0f0f0', color: '#000' }}
          />
        ) : (
          recipe.title
        )}
      </h1>

      <img className='img-dt' src={`http://localhost:3001${recipe.image_url}`} alt={recipe.title} /> {/* Imagen no editable */}

      <h5>
        <strong style={{ color: '#000' }}>Descripción:</strong>{' '}
        {isEditing ? (
          <input
            type="text"
            name="DESCRIPTION"
            value={formData.DESCRIPTION}
            onChange={handleInputChange}
            style={{ backgroundColor: '#f0f0f0', color: '#000' }}
          />
        ) : (
          recipe.DESCRIPTION
        )}
      </h5>

      <h5>
        <strong style={{ color: '#000' }}>Tiempo de preparación:</strong>{' '}
        {isEditing ? (
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            style={{ backgroundColor: '#f0f0f0', color: '#000' }}
          />
        ) : (
          `${recipe.duration} minutos`
        )}
      </h5>

      <h5>
        <strong style={{ color: '#000' }}>Categoría:</strong>{' '}
        {isEditing ? (
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{ backgroundColor: '#f0f0f0', color: '#000' }}
          />
        ) : (
          recipe.category
        )}
      </h5>

      <div>
        {isEditing ? (
          <button className='edit-button' onClick={handleFormSubmit}>Guardar cambios</button>
        ) : (
          <button onClick={handleEditClick}>Editar</button>
        )}
        <button className='delete-button' onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default RecipeDetails;

