const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');

//Exihibe la pagína al puerto destinado
router.get('/',authMiddleWare.authenticate, (req, res, next) => {
    res.render('critic-value', {title: 'Distribumaster',});
    next()
});

module.exports = router;