const usuarioModel = require('../models/usuarioModel');
const authMiddleWare = require('../middleware/authMiddleware');


//Función asíncrona para ingresar usuarios a la BD
async function registrarUsuario(nombre, email, password_hash) {
    // Se encriptan el nombre, email y hash de la contraseña de forma paralela
    let [nombreSeguro, emailSeguro, passwordHashSeguro] = await Promise.all([
        authMiddleWare.encryptData(nombre),
        authMiddleWare.encryptData(email),
        authMiddleWare.encryptData(password_hash)
    ]);

    // Se registra al usuario en la base de datos
    return await usuarioModel.registrarUsuario(`${nombreSeguro},${emailSeguro},${passwordHashSeguro}`);
}

//Función para inicio de sesión del usuario
async function logearUsuario(nombre, password) {
    // Se encriptan el nombre y la contraseña de forma paralela
    let [nombreSeguro, passwordSeguro] = await Promise.all([
        authMiddleWare.encryptData(nombre),
        authMiddleWare.encryptData(password)
    ]);

    // Se intenta logear al usuario en la aplicación
    return await usuarioModel.logearUsuario(`${nombreSeguro},${passwordSeguro}`);
}

module.exports = {
    registrarUsuario,
    logearUsuario
};