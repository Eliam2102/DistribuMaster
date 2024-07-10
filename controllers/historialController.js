//Importaciones necesarias para poder utilizar las funciones dle modelo
const calculoModel = require('../models/calculoModel');


async function obtenerHistorial(usuarioID, token) {
    return await calculoModel.obtenerHistorial(usuarioID, token);
}

module.exports= {
    obtenerHistorial
}