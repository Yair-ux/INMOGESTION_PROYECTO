import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',    // o '127.0.0.1:3306'
  user: 'root',         // tu usuario MySQL
  password: '',         // tu contraseña MySQL, si no tienes deja vacío ''
  database: 'inmogestion' // nombre de tu base de datos
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Aquí pones tus rutas, por ejemplo:
app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3306');
});
