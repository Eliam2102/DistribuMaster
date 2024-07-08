//Importaciones necesarias
const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const math = require('mathjs');

//Exihibe la pagína al puerto destinado
router.get('/',authMiddleWare.authenticate, (req, res, next) => {
    res.render('dist-disc', {title: 'Distribumaster',});
    next()
});


//Exportamos de manera correcta los modulos para poder usarlos en otros archivos.
module.exports = router;