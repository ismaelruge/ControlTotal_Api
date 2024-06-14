// src/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false, // Desactiva el logging, puedes activarlo si lo deseas
  dialectOptions: {
    ssl: {
      require: true, // Asegura que SSL se requiere
      rejectUnauthorized: false // Desactiva la verificación del certificado
      // Si deseas especificar el certificado CA, puedes hacerlo aquí
      // ca: fs.readFileSync('path/to/ca-certificate.crt').toString(),
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos PostgreSQL');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos PostgreSQL:', err);
    process.exit(-1);
  });

module.exports = sequelize;
