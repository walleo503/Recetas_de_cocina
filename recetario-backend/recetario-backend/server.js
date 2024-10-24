const mysql = require('mysql2');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

const upload = multer({ storage });

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'feastadm', // Usuario creado
  password: 'feastpss', // Contraseña creada
  database: 'feastdotcom', // Base de datos creada
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos feastdotcom');
});

// Ruta para agregar una receta
app.post('/addRecipeClass', upload.single('imagen_file'), (req, res) => {
  const { title, description, duration, category } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Datos recibidos:', { title, description, duration, category, image_url });

  if (!title || !description || !category || !image_url) {
    console.error('Campos faltantes:', { title, description, duration, category, image_url });
    return res.status(400).json({ error: 'Faltan campos.' });
  }

  const query = 'INSERT INTO recetas (title, description, duration, category, image_url) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, duration, category, image_url], (err, result) => {
    if (err) {
      console.error('Error al insertar la receta en la base de datos:', err.message);
      return res.status(500).json({ error: 'Error en la base de datos.', details: err.message });
    }
    res.json({ message: 'Receta creada con éxito.', recipeId: result.insertId });
  });
});

// Ruta para obtener todas las recetas
app.get('/recipes', (req, res) => {
  const query = 'SELECT * FROM recetas';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las recetas:', err);
      return res.status(500).json({ error: 'Error en la base de datos.' });
    }
    res.json(results); // Devolvemos las recetas obtenidas
  });
});

// Ruta para obtener los detalles de una receta por ID
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM recetas WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener los detalles de la receta:', err);
      return res.status(500).json({ error: 'Error en la base de datos.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada.' });
    }
    res.json(result[0]);
  });
});

// Ruta para eliminar una receta por ID
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM recetas WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la receta:', err);
      return res.status(500).json({ error: 'Error en la base de datos.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Receta no encontrada.' });
    }
    res.json({ message: 'Receta eliminada con éxito.' });
  });
});

// Ruta para actualizar una receta por ID
app.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, duration, category } = req.body;

  // Primero obtenemos los datos actuales de la receta para comparar
  const getQuery = 'SELECT image_url, description FROM recetas WHERE id = ?';
  
  db.query(getQuery, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener la receta:', err.message);
      return res.status(500).json({ error: 'Error al obtener la receta.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada.' });
    }

    const currentImageUrl = results[0].image_url;
    const currentDescription = results[0].description;

    // Si description está vacío, mantenemos el valor actual
    const finalDescription = description || currentDescription;

    const query = 'UPDATE recetas SET title = ?, description = ?, duration = ?, category = ? WHERE id = ?';
    const queryParams = [title, finalDescription, duration, category, id];

    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error('Error al actualizar la receta:', err.message);
        return res.status(500).json({ error: 'Error en la base de datos.', details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Receta no encontrada.' });
      }

      res.json({ message: 'Receta actualizada con éxito.' });
    });
  });
});



// Carpeta estática para las imágenes
app.use('/uploads', express.static('uploads'));

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
