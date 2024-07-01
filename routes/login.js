//routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleWare = require('../middleware/authMiddleware');

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión', user: req.user != null ? `${req.user.nombre}` : '' });
});


router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  // Si se autentica correctamente, crea un token JWT
  const token = authMiddleWare.generateToken(req.user.id, '1h');

  res.cookie('token', token, { httpOnly: true, secure: false });

  res.redirect('/');
});

module.exports = router;