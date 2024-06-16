// src/middleware/auth.js

const jwt = require('jsonwebtoken');
const LLAVE_SECRETA = process.env.LLAVE_SECRETA || 'tu_llave_secreta';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recibido:', token);

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    jwt.verify(token, LLAVE_SECRETA, (err, user) => {
        if (err) {
            console.log('Error de verificación del token:', err);
            return res.status(403).json({ message: 'Token no válido.' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
