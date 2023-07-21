const express = require('express');

const { auth } = require('express-oauth2-jwt-bearer');
// Importamos el Middleware Error Handler
const errorHandler = require('./middlewares/errorHandler');

// Configuración Middleware con el Servidor de Autorizacion
const autenticacion = auth({
    audience: 'http://localhost:3000/api/biblioteca',
    issuerBaseURL: 'https://aferreyra-dev.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require('./routes/libros');

//Configuramos el middleware de autenticacion
app.use('/libros', autenticacion, librosRouter);

app.use(errorHandler);

app.listen( 3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
