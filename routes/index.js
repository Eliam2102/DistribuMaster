const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');

//Exihibe la pagína al puerto destinado
router.get('/',authMiddleWare.authenticate, (req, res, next) => {
    res.render('index', { title: 'Iniciar sesión', user: req.user != null ? `${req.user.nombre}` : '' });
    next()
});

module.exports = router;