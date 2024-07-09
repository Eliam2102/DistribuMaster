// routes/registrar-usuario.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariocontroller'); // Archivo contenedor de querys para MySQL
const authMiddleWare = require('../middleware/authMiddleware');

// Ruta para manejar el registro de usuarios
router.post('/', async (req, res) => {
    const { nombre, email, password, confirmPassword } = req.body;

    // Verificar si la contraseña y su confirmación coinciden
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }
 
    try {
        // Hash de la contraseña
        const password_hash = await authMiddleWare.getHash(password);

        // Registrar el usuario en la base de datos
        await usuarioController.registrarUsuario(nombre, email, password_hash);

        // Usuario insertado correctamente
        res.redirect('/login');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;