// src/models/datosbasicos/tiposdocumentosModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TiposDocumentos = sequelize.define('TiposDocumentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único para cada tipo de documento',
    },
    codigo: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true,
        comment: 'Código único para cada tipo de documento, máximo 2 caracteres',
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Descripción del tipo de documento, máximo 255 caracteres',
    },
}, {
    tableName: 'tiposdocumentos', // Nombre de la tabla en la base de datos
    timestamps: false, // No Añade createdAt y updatedAt
    comment: 'Tabla que almacena los tipos de documentos permitidos en el sistema',
});

sequelize.sync();

module.exports = TiposDocumentos;