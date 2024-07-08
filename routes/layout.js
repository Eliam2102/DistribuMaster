// routes/index.js
const express = require('express');
const router = express.Router();


// Rutas públicas
router.get('/', (req, res) => {
    res.render('layout', { title: 'Iniciar sesión', email: req.user != null ? `${req.user.email}` : '' });
});

module.exports = router;
