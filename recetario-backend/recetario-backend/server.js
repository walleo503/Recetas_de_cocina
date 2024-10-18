const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2'); // Cambia si usas otra base de datos como SQLite
const cors = require('cors'); // Para permitir peticiones desde React

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

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'recetario_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Ruta para agregar una nueva receta con imagen
app.post('/addRecipeClass', upload.single('imagen_file'), (req, res) => {
  const { nombre } = req.body;
  const imagen = req.file.filename;

  if (!nombre || !imagen) {
    return res.status(400).json({ error: 'Faltan campos: nombre o imagen.' });
  }

  const query = 'INSERT INTO recetas (nombre, imagen) VALUES (?, ?)';
  db.query(query, [nombre, imagen], (err, result) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos.' });
    }
    res.json({ message: 'Receta creada con éxito.' });
  });
});

// Carpeta estática para las imágenes subidas
app.use('/uploads', express.static('uploads'));

// Inicia el servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
