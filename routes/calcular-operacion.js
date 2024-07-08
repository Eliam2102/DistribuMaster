const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const calculoController = require('../controllers/calculoController');

// Ruta para redirigir al controlador encargado de las operaciones
router.post('/', authMiddleWare.authenticate, async (req, res) => {
    const { tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario } = req.body;
    try {
        // Llamar al controlador para calcular la operación
        await calculoController.calcularOperacion(
            req,
            res,
            req.user.id,
            tipocalculo,
            parametro_principal,
            parametro_secundario,
            parametro_terciario,
            parametro_cuaternario,
            req.cookies.token
        );
        res.redirect('/');
        // El controlador se encargará de enviar la respuesta
    } catch (error) {
        // Manejar cualquier error ocurrido durante el cálculo
        console.error('Error en el cálculo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
