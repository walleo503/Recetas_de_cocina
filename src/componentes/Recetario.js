import React, { useState } from 'react';
import '../componentes/styles.css';
import { Navigation } from '../components/navigation';
import axios from 'axios';

export const Recetario = () => {
  const [showModal, setShowModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '' });
  const [imageFile, setImageFile] = useState(null); // Estado para manejar la imagen
  const [error, setError] = useState('');
  const maxNameLength = 50; // Límite de caracteres para el nombre

  const handleCreateNewRecipe = async () => {
    if (!newRecipe.name || !imageFile) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', newRecipe.name);
    formData.append('imagen_file', imageFile); // Imagen cargada o arrastrada

    try {
      await axios.post('http://localhost:3001/addRecipeClass', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });      
      alert('Nueva clase de receta creada');
      setShowModal(false);
      setNewRecipe({ name: '' });
      setImageFile(null);
      setError('');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Error al crear nueva clase de receta');
    }
  };

  // Maneja el drop de una imagen
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    } else {
      setError('Por favor, seleccione un archivo de imagen válido.');
    }
  };

  // Evita el comportamiento por defecto al arrastrar una imagen sobre la zona
  const handleDragOver = (e) => {
    e.preventDefault();
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
            />
            <button
              onClick={() => setShowModal(true)}
            >
              Crear nueva receta
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear nueva clase de receta</h2>

            {/* Campo de texto para el nombre de la receta */}
            <input
              type="text"
              placeholder="Nombre de la receta"
              value={newRecipe.name}
              maxLength={maxNameLength}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
            <p>{newRecipe.name.length}/{maxNameLength} caracteres</p>

            {/* Área de arrastrar y soltar */}
            <div
              className="dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {imageFile ? (
                <p>Imagen seleccionada: {imageFile.name}</p>
              ) : (
                <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
              )}
            </div>

            {/* Input para seleccionar una imagen */}
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            {/* Mostrar errores */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Botones del modal */}
            <div className="modal-buttons">
              <button onClick={handleCreateNewRecipe}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Recetario;
