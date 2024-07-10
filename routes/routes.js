//Importaciones necesarias
const express = require('express');
const router = express.Router();


//Rutas necesarias
const index = require('./index');
const login = require('./login');
const register = require('./register');
const registrarUsuario = require('./registrar-usuario');
const distDisc = require('./dist-disc');
const distCont = require('./dist-cont');
const critValue= require('./critic-value');
const probAcum = require('./prob-acum');
const probInt = require ('./prob-int');
const probPuntual = require('./prob-puntual');
const calcularOperacion = require('./calcular-operacion');
const calcularContinua = require('./calcular-continua');
const resultadoDisc = require('./resultado-discretas');
const resultadoCont = require('./resultado-continuas');
const historial = require('./historial');

//Configura las rutas
router.use('/', index);
router.use('/login', login);
router.use('/register', register);
router.use('/registrar-usuario', registrarUsuario);
router.use('/dist-disc',distDisc);
router.use('/dist-cont',distCont);
router.use('/critic-value', critValue);
router.use('/prob-acum', probAcum);
router.use('/prob-int', probInt);
router.use('/prob-puntual', probPuntual);
router.use('/calcular-operacion', calcularOperacion);
router.use('/calcular-continua', calcularContinua);
router.use('/resultado-discretas', resultadoDisc);
router.use('/resultado-continuas', resultadoCont);
router.use('/historial', historial);

module.exports = router;