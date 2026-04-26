const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const AutenticadorMiddleware = require('./apps/middlewares/autenticador');
const AutenticadorIsAdmin = require('./apps/middlewares/isAdmin');
const AutenticadorController = require('./apps/controllers/AutenticadorController');
const authSchema = require('./schemas/auth_schema.json');
const UsuarioController = require('./apps/controllers/UsuarioController');
const usuarioSchema = require('./schemas/create_usuario_schema.json');

const routes = new Router();

routes.post('/usuario', schemaValidator(usuarioSchema), UsuarioController.create);

routes.post('/auth', schemaValidator(authSchema), AutenticadorController.autenticar);
routes.use(AutenticadorMiddleware);
routes.get('/', (req, res) => {
    return res.send({message: 'Connected'});
});


routes.use(AutenticadorIsAdmin);

module.exports = routes;