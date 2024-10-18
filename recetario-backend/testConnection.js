const sql = require('mssql');

const config = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  server: 'tu_servidor', // Ejemplo: localhost o la dirección IP del servidor
  database: 'tu_base_de_datos',
  options: {
    encrypt: true, // Cambiar a false si no usas SSL
    trustServerCertificate: true // Cambiar a false en producción
  }
};

async function connect() {
  try {
    await sql.connect(config);
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  } finally {
    await sql.close();
  }
}

connect();
