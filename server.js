const express = require('express');
const app = express();
const path = require('path');


//Procesa los archivos estáticos que están en la carpeta public
app.use(express.static('public'));
app.use(express.json());

//Configuración de la plantilla pug
app.set('view engine', 'pug'); //Motor de plantillas
app.set('views', path.join(__dirname, 'views'));


const router = require('./routes/routes');

//Manejo de todas las solicitudes para las ruta principal o subrutas
app.use('/', router);

//Puerto en el cual se escucha el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});