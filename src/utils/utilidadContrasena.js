// src/utils/utilidadContrasena.js

const crypto = require('crypto');
require('dotenv').config();

const algoritmo = 'aes-256-cbc';
const claveSecreta = Buffer.from(process.env.CLAVE_SECRETA, 'hex'); // Leer clave secreta desde el .env

/**
 * Encripta una contraseña.
 * @param {string} contrasena - La contraseña en texto plano.
 * @returns {string} - La contraseña encriptada.
 */
function encriptarContrasena(contrasena) {
    const iv = crypto.randomBytes(16); // Generar un IV aleatorio para cada encriptación
    const cipher = crypto.createCipheriv(algoritmo, claveSecreta, iv);
    let encriptado = cipher.update(contrasena);
    encriptado = Buffer.concat([encriptado, cipher.final()]);
    return iv.toString('hex') + ':' + encriptado.toString('hex');
}

/**
 * Desencripta una contraseña.
 * @param {string} contrasenaEncriptada - La contraseña encriptada.
 * @returns {string} - La contraseña en texto plano.
 */
function desencriptarContrasena(contrasenaEncriptada) {
    const partes = contrasenaEncriptada.split(':');
    const iv = Buffer.from(partes.shift(), 'hex');
    const textoEncriptado = Buffer.from(partes.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algoritmo, claveSecreta, iv);
    let desencriptado = decipher.update(textoEncriptado);
    desencriptado = Buffer.concat([desencriptado, decipher.final()]);
    return desencriptado.toString();
}

module.exports = {
    encriptarContrasena,
    desencriptarContrasena,
};
