//src/routes/datos_basicos/tiposdocumentos.js

const express = require('express');
const TiposDocumentos = require('../../models/datos_basicos/tiposdocumentosModel');
const authenticateToken = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const tiposDocumentos = await TiposDocumentos.findAll();
        res.status(200).json({ tiposDocumentos });
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            res.status(500).json({ message: 'Error en la base de datos: ' + error.message });
        } else {
            res.status(500).json({ message: 'Error al iniciar sesión: ' + error.message });
        }
    }
});

let data = [
    { codigo: '11', descripcion: 'Registro civil de nacimiento' },
    { codigo: '12', descripcion: 'Tarjeta de identidad' },
    { codigo: '13', descripcion: 'Cédula de ciudadanía' },
    { codigo: '14', descripcion: 'Certificado de la Registraduría para sucesiones ilíquidas de personas naturales que no tienen ningún documento de identificación.' },
    { codigo: '15', descripcion: 'Tipo de documento que identifica una sucesión ilíquida, expedido por la notaria o por un juzgado.' },
    { codigo: '21', descripcion: 'Tarjeta de extranjería' },
    { codigo: '22', descripcion: 'Cédula de extranjería' },
    { codigo: '31', descripcion: 'NIT' },
    { codigo: '33', descripcion: 'Identificación de extranjeros diferente al NIT asignado DIAN' },
    { codigo: '41', descripcion: 'Pasaporte' },
    { codigo: '42', descripcion: 'Documento de identificación extranjero' },
    { codigo: '43', descripcion: 'Sin identificación del exterior o para uso definido por la DIAN.' },
    { codigo: '44', descripcion: 'Documento de Identificación extranjero Persona Jurídica' },
    { codigo: '46', descripcion: 'Carné Diplomático: Documento expedido por el Ministerio de Relaciones Exteriores a los miembros de la misiones diplomáticas y consulares, con el que se deben identificar ente las autoridades nacionales' },
];

router.get('/data', authenticateToken, async (req, res) => {
    try {
        data.forEach(async (item) => {
            let tipoDocumento = await TiposDocumentos.findOne({ where: { codigo: item.codigo } });
            if (!tipoDocumento) {
                await TiposDocumentos.create(item);
            }
        });

        res.status(200).json({ message: 'Datos de ingresados en la tabla tiposdocumentos' });
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            res.status(500).json({ message: 'Error en la base de datos: ' + error.message });
        } else {
            res.status(500).json({ message: 'Error al iniciar sesión: ' + error.message });
        }
    }
});

router.get('/updatedata', authenticateToken, async (req, res) => {
    try {
        data.forEach(async (item) => {
            let tipoDocumento = await TiposDocumentos.findOne({ where: { codigo: item.codigo } });
            if (tipoDocumento) {
                await TiposDocumentos.update({ descripcion: item.descripcion }, { where: { codigo: item.codigo } });
            }
        });

        res.status(200).json({ message: 'Datos actualizados en la tabla tiposdocumentos' });
    } catch (error) {
        if (error instanceof Sequelize.DatabaseError) {
            res.status(500).json({ message: 'Error en la base de datos: ' + error.message });
        } else {
            res.status(500).json({ message: 'Error al iniciar sesión: ' + error.message });
        }
    }
});

module.exports = router;