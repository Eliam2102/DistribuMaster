const axios = require('axios');

class Usuario {
    constructor(UsuarioID, nombre, email, pass) {
        this.UsuarioID = UsuarioID;
        this.nombre = nombre;
        this.email = email;
        this.pass = pass;
    }
}

async function registrarUsuario(dataSegura) {
    try {
        await axios.post(`${process.env.BASE_URL}/usuarios/registrar-usuario`, { dataSegura });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

async function logearUsuario(dataSegura) {
    try {
        const response = await axios.post(`${process.env.BASE_URL}/usuarios/login`, {dataSegura});
        const usuario = response.data;
        return new Usuario(usuario.UsuarioID, usuario.nombre, usuario.email, usuario.pass);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    logearUsuario
};