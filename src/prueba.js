import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecetasComponent = () => {
  const [recetas, setRecetas] = useState([]);

  // Función para hacer la solicitud GET al backend
  const fetchRecetas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recetas');
      setRecetas(response.data);  // Almacena los datos en el estado
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect para ejecutar la solicitud cuando el componente se monte
  useEffect(() => {
    fetchRecetas();
  }, []);

  return (
    <div>
      <h1>Recetas</h1>
      <ul>
        {recetas.map((receta) => (
          <li key={receta.id}>
            <h2>{receta.nombre_de_receta}</h2>
            <p>Por: {receta.usuario}</p>
            <p>Fecha de Publicación: {receta.fecha_publicacion}</p>
            <p>Tiempo de Preparación: {receta.tiempo_de_preparacion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecetasComponent;
