import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null); 
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
          description: response.data.description,
          duration: response.data.duration,
          category: response.data.category,
        });
        setImagePreview(`http://localhost:3001${response.data.image_url}`);
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

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      title: recipe.title,
      description: recipe.description,
      duration: recipe.duration,
      category: recipe.category,
    });
    setImagePreview(`http://localhost:3001${recipe.image_url}`);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = function () {
        if (img.width === 500 && img.height === 500) {
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file)); 
        } else {
          setError('La imagen debe ser de 500x500 píxeles.');
        }
      };
    } else {
      setError('Solo se permiten archivos .png');
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFormSubmit = async () => {
    try {
      const updatedData = { ...formData };
      if (imageFile) {
        const imageData = new FormData();
        imageData.append('imagen_file', imageFile);
        updatedData.image_url = imageFile.name;
      }
      await axios.put(`http://localhost:3001/recipes/${id}`, updatedData);
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
        navigate('/recetario');
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
    <div className="recipe-details-container">

      <div className="image-container">
        {imagePreview ? (
          <>
            <img className='image-preview' src={imagePreview} alt={recipe.title} />
            {isEditing && <button className="delete-image-button" onClick={handleDeleteImage}>🗑️ Eliminar Imagen</button>}
          </>
        ) : (
          isEditing && (
            <div className="image-dropzone">
              <input type="file" accept="image/png" onChange={handleImageChange} />
              <p>Arrastra una imagen 500x500 aquí</p>
            </div>
          )
        )}
      </div>

      <h5 className="title-title">
        <strong>title:</strong>{' '}
        {isEditing ? (
          <textarea
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input-title"
          />
        ) : (
          recipe.title
        )}
      </h5>

      <h5 className="description-title">
        <strong>Descripción:</strong>{' '}
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-description"
          />
        ) : (
          recipe.description
        )}
      </h5>

      <h5 className="prep-time-title">
        <strong>Tiempo de preparación:</strong>{' '}
        {isEditing ? (
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="input-duration"
          />
        ) : (
          `${recipe.duration} minutos`
        )}
      </h5>

      <h5 className="category-title">
        <strong>Categoría:</strong>{' '}
        {isEditing ? (
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="input-category"
          />
        ) : (
          recipe.category
        )}
      </h5>

      <div className="buttons-container">
        {isEditing ? (
          <>
            <button className="edit-button" onClick={handleFormSubmit}>Guardar cambios</button>
            <button className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="edit-button" onClick={handleEditClick}>Editar</button>
            <button className="delete-button" onClick={handleDelete}>Eliminar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
