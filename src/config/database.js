// src/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false, // Desactiva el logging, puedes activarlo si lo deseas
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
