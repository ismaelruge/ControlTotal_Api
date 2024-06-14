// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const sequelize = require('./src/config/database'); // Importa la configuración de Sequelize
const rutasAutenticacion = require('./src/routes/rutasAutenticacion'); // Importa las rutas de autenticación

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para validar la conexión a la base de datos
app.get('/validate-connection', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).send('Conexión a la base de datos PostgreSQL exitosa');
    } catch (error) {
        res.status(500).send('Error al conectar a la base de datos PostgreSQL: ' + error.message);
    }
});

// Endpoint para generar una clave secreta aleatoria
app.get('/generate-secret-key', (req, res) => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    res.status(200).send(`Clave secreta generada: ${secretKey}`);
});

// Usar las rutas de autenticación
app.use('/auth', rutasAutenticacion);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    socket.on('message', (data) => {
        console.log('Mensaje recibido en el servidor:', data);
        io.emit('message', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
});
