const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', authMiddleware.authenticate, async (req, res) => {
    try {
        const data = await historialController.obtenerHistorial(req.user.id, req.cookies.token);
        // Procesar datos adicionales si es necesario
        res.render('historial', { data });
    } catch (error) {
        console.error("Error al obtener el historial:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;
