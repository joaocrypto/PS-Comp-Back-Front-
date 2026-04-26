const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const AutenticadorMiddleware = require('./apps/middlewares/autenticador');
const AutenticadorIsAdmin = require('./apps/middlewares/isAdmin');

const AutenticadorController = require('./apps/controllers/AutenticadorController');
const UsuarioController = require('./apps/controllers/UsuarioController');

const authSchema = require('./schemas/auth_schema.json');
const usuarioSchema = require('./schemas/create_usuario_schema.json');
const codigoSchema = require('./schemas/codigo_schema.json');
const resetPasswordSchema = require('./schemas/reset_password_schema.json');

const routes = new Router();

routes.post('/register', schemaValidator(usuarioSchema), UsuarioController.create);
routes.post('/login', schemaValidator(authSchema), AutenticadorController.autenticar);
routes.post('/login/recuperar_senha', schemaValidator(codigoSchema), AutenticadorController.esqueciSenha);
routes.put('/login/recuperar_senha/confirmar', schemaValidator(resetPasswordSchema), AutenticadorController.resetaSenha);

routes.use(AutenticadorMiddleware);

routes.get('/', (req, res) => {
    return res.send({message: 'Connected'});
});

routes.use(AutenticadorIsAdmin);

module.exports = routes;