const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  token: String,
  expiresAt: Date,
});

module.exports = mongoose.model('PasswordResetToken', tokenSchema);