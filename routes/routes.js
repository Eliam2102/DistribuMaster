//Importaciones necesarias
const express = require('express');
const router = express.Router();


//Rutas necesarias
const index = require('./index');
const login = require('./login');
const register = require('./register');

//Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/register', register);

module.exports = router;