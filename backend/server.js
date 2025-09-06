require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// ==================== Conexión a MySQL ====================
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// ==================== Rutas existentes ====================
app.use('/api/auth', require('./routes/authRoutes'));

// ==================== Configuración Multer ====================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ==================== Endpoint carga masiva ====================
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  try {
    const buffer = req.file.buffer;
    const extension = req.file.originalname.split('.').pop().toLowerCase();
    let data = [];

    if (extension === 'csv') {
      const text = buffer.toString('utf-8');
      data = text.split('\n').map((row) => row.split(','));
    } else if (['xlsx', 'xls'].includes(extension)) {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
    }

    // Suponiendo que la primera fila son encabezados
    const headers = data[0];
    const rows = data.slice(1).filter((row) => row.length > 0);

    // Guardar en la BD (ejemplo: tabla "usuarios" con columnas name, email)
    for (const row of rows) {
      await db.query('INSERT INTO usuarios (name, email) VALUES (?, ?)', [
        row[0],
        row[1],
      ]);
    }

    res.json({
      message: 'Archivo procesado y guardado en BD con éxito',
      preview: rows.slice(0, 5),
    });
  } catch (error) {
    console.error('Error procesando archivo:', error);
    res.status(500).json({ error: 'Error procesando el archivo' });
  }
});

// ==================== Servidor ====================
app.listen(process.env.PORT, () => {
  console.log(`Servidor backend en puerto ${process.env.PORT}`);
});
