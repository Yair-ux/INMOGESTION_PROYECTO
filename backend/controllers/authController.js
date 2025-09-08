const pool = require('../db');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length === 0) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const user = users[0];
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await pool.query('DELETE FROM password_reset_tokens WHERE user_id = ?', [user.id]);

  await pool.query(
    'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
    [user.id, token, expiresAt]
  );

  const link = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user.id}`;
  await sendEmail(email, 'Recuperar contraseña', `
    <p>Haz clic en el siguiente enlace:</p>
    <a href="${link}">Recuperar contraseña</a>
    <p>Este enlace expirará en 1 hora.</p>
  `);

  res.json({ message: 'Enlace enviado al correo' });
};

exports.resetPassword = async (req, res) => {
  const { userId, token, password } = req.body;

  const [tokens] = await pool.query(
    'SELECT * FROM password_reset_tokens WHERE user_id = ? AND token = ?',
    [userId, token]
  );

  if (tokens.length === 0 || new Date(tokens[0].expires_at) < new Date()) {
    return res.status(400).json({ message: 'Token inválido o expirado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
  await pool.query('DELETE FROM password_reset_tokens WHERE user_id = ?', [userId]);

  res.json({ message: 'Contraseña actualizada' });
};