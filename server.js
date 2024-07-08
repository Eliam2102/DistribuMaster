  const express = require('express');
  const app = express();
  const session = require ('express-session');
  const path = require('path');
  const flash = require('connect-flash');
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const SQLiteStore = require('connect-sqlite3')(session);
  const usuarioController = require('./controllers/usuarioController');
  const dotenv = require('dotenv');
  const cookieParser = require('cookie-parser');
  const authMiddleWare = require('./middleware/authMiddleware');

  //Se configura cookie Parser
  app.use(cookieParser());

  //Configura DotEnv
  dotenv.config();

  // Configurar middleware para manejar sesiones
  app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessionsDB.sqlite', table: 'sessions' }) // Almacena las sesiones en una base de datos SQLite
  }));

  // Configura connect-flash
  app.use(flash());

  // Configurar Passport.js
  app.use(passport.initialize());
  app.use(passport.session());

  // Configurar estrategia de autenticación local
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await usuarioController.logearUsuario(username, password);
        if (!user) {
          return done(null, false, { message: 'Usuario o contraseña incorrecto' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));


  passport.serializeUser((user, done) => {
      done(null, user);
    });
    
    passport.deserializeUser(async (user, done) => {
      done(null, user);
  });
    

  // Configurar para procesar datos URL codificados y JSON
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Procesa los archivos estáticos que están en la carpeta public
  app.use(express.static('public'));
  app.use(express.json());


  //Configuración de la plantilla pug
  app.set('view engine', 'pug'); //Motor de plantillas
  app.set('views', path.join(__dirname, 'views'));


  const router = require('./routes/routes');
  //Manejo de todas las solicitudes para las ruta principal o subrutas
  app.use('/', router);

  //Ruta para cerrar sesión
  app.get('/logout', async (req, res) => {
      await req.logout(async (err) => {
        if (err) {
          // Manejo del error, si es necesario
          console.error(err);
        }
        //req.session.destroy(); // Eliminar la sesión completa
        await req.session.destroy((err) => {
          if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
          }
          console.log('req.session.destroy finalizado correctamente');
        });
        // Eliminar el contenido del almacén de sesiones
        await req.sessionStore.clear((err) => {
          if (err) {
            console.error('Error al limpiar el almacén de sesiones:', err);
            return res.status(500).send('Error al cerrar sesión');
          }
          console.log('req.sessionStore.clear finalizado correctamente');
        });
        res.clearCookie('token');
        res.redirect('/'); // Redirigir a la página principal u otra página de tu elección
      });
  });
    
  //Puerto en el cual se escucha el servidor
  const port = 3000;
  app.listen(port, () => {
      console.log(`Servidor iniciado en http://localhost:${port}`);
  });