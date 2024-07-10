const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const puntController = require('../controllers/puntController');

// Ruta para redirigir al controlador encargado de las operaciones
router.post('/', authMiddleWare.authenticate, async (req, res) => {
    const { tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario } = req.body;

    //Debugueo para ver que se trae correctamente le id del usuario.
    console.log('UsuarioID: ' + req.user.id);
    try {
        // Llamar al controlador para calcular la operación
        await puntController.calcularProbabilidadPuntual(
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
    } catch (error) {
        // Manejar cualquier error ocurrido durante el cálculo
        console.error('Error en el cálculo de la probabilidad puntual:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
