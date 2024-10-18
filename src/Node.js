const express = require('express');
const sql = require('mssql');

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Configuración de conexión a SQL Server
const dbConfig = {
    user: 'tuUsuario',
    password: 'tuContraseña',
    server: 'tuServidor', 
    database: 'tuBaseDeDatos',
    options: {
        encrypt: true,
        trustServerCertificate: true, // Solo si usas certificados auto-firmados
    }
};

// Conectar a SQL Server
sql.connect(dbConfig, err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Endpoint para guardar una receta
app.post('/api/recetas', async (req, res) => {
    const { nombre, imagen_url } = req.body;

    try {
        const request = new sql.Request();
        await request.query(
            `INSERT INTO clase_recetas (nombre, imagen_url) VALUES ('${nombre}', '${imagen_url}')`
        );
        res.status(201).send('Receta guardada con éxito');
    } catch (err) {
        console.error('Error al guardar la receta:', err);
        res.status(500).send('Error al guardar la receta');
    }
});

// Inicia el servidor
app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});
