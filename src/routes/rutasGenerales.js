// src/routes/rutasGenerales.js

const express = require('express');
const tiposDocumentosRoutes = require('./datos_basicos/tiposdocumentos');
// Importa otras rutas aquí según sea necesario

const router = express.Router();

// Usa las rutas importadas
router.use('/datos_basicos/tiposdocumentos', tiposDocumentosRoutes);
// Agrega otras rutas aquí con router.use()

module.exports = router;
