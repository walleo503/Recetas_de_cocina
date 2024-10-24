import React, { useState } from 'react';
import axios from 'axios';
import './CreateRecipeModal.css';

const CreateRecipeModal = ({ onClose, fetchRecipes }) => {
  const [newRecipe, setNewRecipe] = useState({ title: '', duration: 0, description: '', category: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 
  const [error, setError] = useState('');

  const maxTitleLength = 20;
  const maxDescriptionLength = 500;
  const categories = [
    "Desayuno", "Almuerzo", "Cena", "Postres", "Vegetariano", 
    "Vegano", "Pasta", "Pescados", "Carnes", "Sopas"
  ];

  const handleCreateNewRecipe = async () => {
    if (!newRecipe.title || !newRecipe.description || !newRecipe.category || !imageFile) {
      setError('Por favor, complete todos los campos.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', newRecipe.title);
    formData.append('duration', newRecipe.duration);
    formData.append('description', newRecipe.description);
    formData.append('category', newRecipe.category);
    formData.append('imagen_file', imageFile);
  
    try {
      const response = await axios.post('http://localhost:3001/addRecipeClass', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      window.location.reload(); 
      alert('Nueva receta creada');
      fetchRecipes(); // Actualiza las recetas después de la creación
      onClose();
      setNewRecipe({ title: '', duration: 0, description: '', category: '' });
      setImageFile(null);
      setImagePreview(null);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.details || error.message;
      console.error('Error:', errorMessage);
      setError(`Error al crear la receta: ${errorMessage}`);  // Mostrar el error detallado del servidor
    }
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null); 
  };

  return (
    <div className="modal no-backdrop">
      <div className="modal-content right-side">
        <h2>Crear nueva receta</h2>

        {/* Campo de título de la receta */}
        <label>Título de la receta</label>
        <input
          type="text"
          placeholder="Título de la receta"
          value={newRecipe.title}
          maxLength={maxTitleLength}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
          className="large-input"
        />
        <p className={newRecipe.title.length === maxTitleLength ? "red-text" : ""}>
          {newRecipe.title.length}/{maxTitleLength} caracteres
        </p>

        {/* Spinner para tiempo de duración */}
        <label>Tiempo (minutos)</label>
        <input
          type="number"
          min="1"
          max="1000"
          value={newRecipe.duration}
          onChange={(e) => setNewRecipe({ ...newRecipe, duration: e.target.value })}
          className="large-input"
        />

        {/* Campo de descripción */}
        <label className="description-label">Descripción</label>
        <textarea
          placeholder="Descripción de la receta"
          value={newRecipe.description}
          maxLength={maxDescriptionLength}
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
          className="large-textarea"
        />
        <p className={newRecipe.description.length === maxDescriptionLength ? "red-text" : ""}>
          {newRecipe.description.length}/{maxDescriptionLength} caracteres
        </p>

        {/* Categorías */}
        <label>Categoría</label>
        <select
          value={newRecipe.category}
          onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
          className="large-input"
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        {/* Área de arrastrar y soltar imagen */}
        <div
          className="dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Vista previa" width="100%" height="100%" />
              <button className="remove-image-button" onClick={handleRemoveImage}>Cambiar Imagen</button>
            </>
          ) : (
            <p>Arrastra la imagen aquí</p>
          )}
        </div>
        <label>Recomendación: solo .png 500x500 píxeles</label> 

        {/* Mostrar errores */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Botones del modal */}
        <div className="modal-buttons">
          <button onClick={handleCreateNewRecipe}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeModal;
