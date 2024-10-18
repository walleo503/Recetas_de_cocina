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
    trustServerCertificate: true, // false si no confías en el certificado del servidor
  },
};

// Ruta para agregar receta
app.post('/addRecipe', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const { nombre, imagen_url } = req.body;

    const query = `INSERT INTO clase_recetas (nombre, imagen_url) VALUES (@nombre, @imagen_url)`;
    const result = await sql.query(query, {
      nombre: nombre,
      imagen_url: imagen_url,
    });

    res.status(200).json({ message: 'Receta agregada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar receta' });
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
