// src/models/login/superAdminModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definición del modelo SuperAdmin
const SuperAdmin = sequelize.define('SuperAdmin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único para cada super administrador',
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Nombre de usuario del super administrador, debe ser único',
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Contraseña del super administrador, almacenada de forma segura',
    },
    correoelectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        comment: 'Correo electrónico del super administrador, debe ser único y válido',
    },
}, {
    tableName: 'superadministradores', // Nombre de la tabla en la base de datos
    timestamps: false, // No Añade createdAt y updatedAt
    comment: 'Tabla que almacena los datos de los super administradores del sistema',
});

module.exports = SuperAdmin;


/*

CREATE TABLE superadministradores (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    correoelectronico VARCHAR(255) NOT NULL UNIQUE
);


*/