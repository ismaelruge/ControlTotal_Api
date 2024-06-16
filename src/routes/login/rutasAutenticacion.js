// src/routes/login/rutasAutenticacion.js

const express = require('express');
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../../models/login/superAdminModel');
const { desencriptarContrasena } = require('../../utils/utilidadContrasena');

const router = express.Router();
const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'tu_llave_secreta';

// Ruta para el login del super administrador
router.post('/superadmin/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    // Verificar que se proporcionaron todos los parámetros necesarios
    if (!usuario || !contrasena) {
        res.status(400).json({ message: 'Faltan parámetros necesarios' });
        return;
    }

    try {
        const superAdmin = await SuperAdmin.findOne({ where: { usuario } });
        if (!superAdmin) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const contrasenaDesencriptada = desencriptarContrasena(superAdmin.contrasena);
        if (contrasena !== contrasenaDesencriptada) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }

        const token = jwt.sign({ userId: superAdmin.id }, LLAVE_SECRETA, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            res.status(500).json({ message: 'Error en la base de datos: ' + error.message });
        } else {
            res.status(500).json({ message: 'Error al iniciar sesión: ' + error.message });
        }
    }
});

module.exports = router;