const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');

//Exihibe la pagína al puerto destinado
router.get('/',authMiddleWare.authenticate, (req, res, next) => {
    res.render('index', { title: req.user != null ? `Bienvenido ${req.user.email}` : 'DistribuMaster', user: req.user != null ? `${req.user.email}` : ''});
    next()
});

module.exports = router;