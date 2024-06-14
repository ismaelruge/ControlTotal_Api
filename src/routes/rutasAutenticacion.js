// src/routes/rutasAutenticacion.js

const express = require('express');
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/superAdminModel');
const { encriptarContrasena, desencriptarContrasena } = require('../utils/utilidadContrasena');

const router = express.Router();
const LLAVE_SECRETA = process.env.CLAVE_SECRETA || 'tu_llave_secreta';

// Ruta para el login del super administrador
router.post('/superadmin/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
    try {
        const superAdmin = await SuperAdmin.findOne({ where: { usuario } });
        if (!superAdmin) {
            return res.status(404).send('Usuario no encontrado');
        }

        const contrasenaDesencriptada = desencriptarContrasena(superAdmin.contrasena);
        if (contrasena !== contrasenaDesencriptada) {
            return res.status(401).send('Contraseña incorrecta');
        }

        const token = jwt.sign({ userId: superAdmin.id }, LLAVE_SECRETA, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Error al iniciar sesión: ' + error.message);
    }
});

module.exports = router;
