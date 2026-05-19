const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const AutenticadorMiddleware = require('./apps/middlewares/autenticador');
const AutenticadorIsAdmin = require('./apps/middlewares/isAdmin');

const AutenticadorController = require('./apps/controllers/AutenticadorController');
const UsuarioController = require('./apps/controllers/UsuarioController');
const FilmeController = require('./apps/controllers/FilmeController');

const authSchema = require('./schemas/auth_schema.json');
const codigoSchema = require('./schemas/codigo_schema.json');
const resetPasswordSchema = require('./schemas/reset_password_schema.json');
const createUsuarioSchema = require('./schemas/create_usuario_schema.json');
const createFilmeSchema = require('./schemas/create_filme_schema.json');
const updateUsuarioSchema = require('./schemas/update_usuario_schema.json');
const updateFilmeSchema = require('./schemas/update_filme_schema.json');

const routes = new Router();

routes.post('/register', schemaValidator(createUsuarioSchema), UsuarioController.create);
routes.post('/login', schemaValidator(authSchema), AutenticadorController.autenticar);
routes.post('/login/recuperar_senha', schemaValidator(codigoSchema), AutenticadorController.esqueciSenha);
routes.put('/login/recuperar_senha/confirmar', schemaValidator(resetPasswordSchema), AutenticadorController.resetaSenha);
routes.post('/filme', schemaValidator(createFilmeSchema), FilmeController.create);
routes.delete('/delete-filme/:id', FilmeController.delete);
routes.put('/update-filme/:id', schemaValidator(updateFilmeSchema), FilmeController.update);
routes.get('/list-filme/:id', FilmeController.listOne);
routes.get('/list-all-filmes/', FilmeController.listAll);

routes.use(AutenticadorMiddleware);

routes.put('/user/update', schemaValidator(updateUsuarioSchema), UsuarioController.update);
routes.delete('/user/delete', UsuarioController.delete);

routes.get('/', (req, res) => {
    return res.send({message: 'Connected'});
});

routes.use(AutenticadorIsAdmin);



module.exports = routes;