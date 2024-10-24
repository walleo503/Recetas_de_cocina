const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de SQL Server
const dbConfig = {
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  server: 'TU_SERVIDOR',
  database: 'TU_BASE_DE_DATOS',
  options: {
    encrypt: true, // true si usas Azure
    trustServerCertificate: true, // true si confías en el certificado del servidor
  },
};

// Ruta para agregar receta
app.post('/addRecipe', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const { nombre, imagen_url } = req.body;

    // Preparamos la consulta usando parámetros para evitar inyecciones SQL
    const query = `
      INSERT INTO clase_recetas (nombre, imagen_url) 
      VALUES (@nombre, @imagen_url)
    `;

    const request = new sql.Request();
    request.input('nombre', sql.NVarChar, nombre);
    request.input('imagen_url', sql.NVarChar, imagen_url);
    
    await request.query(query);

    res.status(200).json({ message: 'Receta agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar receta:', error);
    res.status(500).json({ error: 'Error al agregar receta' });
  }
});

// Ruta para obtener todas las recetas
app.get('/recipes', async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const query = `SELECT * FROM clase_recetas`;

    const result = await sql.query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
