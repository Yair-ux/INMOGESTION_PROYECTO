const express = require('express')
const { getUsuarios } = require('../controllers/usuarios.controller')

const router = express.Router()

router.get('/', getUsuarios)

module.exports = router
