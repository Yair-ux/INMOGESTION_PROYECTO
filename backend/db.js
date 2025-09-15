const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // usa el puerto de .env o 3306 por defecto
  waitForConnections: true,
  connectionLimit: 10, // número máximo de conexiones abiertas
  queueLimit: 0, // 0 = ilimitadas en cola
})

// Función para probar la conexión apenas arranca el backend
;(async () => {
  try {
    const connection = await pool.getConnection()
    console.log('✅ Conectado a la base de datos MySQL')
    connection.release()
  } catch (err) {
    console.error('❌ Error al conectar con la BD:', err.message)
  }
})()

module.exports = pool
