const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const AutenticadorController = require('./apps/controllers/AutenticadorController');
const UsuarioController = require('./apps/controllers/UsuarioController');
const usuarioSchema = require('./schemas/create_usuario_schema.json');

const routes = new Router();

routes.post('/usuario', schemaValidator(usuarioSchema), UsuarioController.create);

routes.post('/auth', AutenticadorController.autenticar);

routes.get('/', (req, res) => {
    return res.send({message: 'Connected'});
});

module.exports = routes;