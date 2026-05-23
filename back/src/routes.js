const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const AutenticadorMiddleware = require('./apps/middlewares/autenticador');
const AutenticadorIsAdmin = require('./apps/middlewares/isAdmin');
const upload = require('./configs/multer');
const convertType = require('./utils/convertType');

const AutenticadorController = require('./apps/controllers/AutenticadorController');
const UsuarioController = require('./apps/controllers/UsuarioController');
const FilmeController = require('./apps/controllers/FilmeController');
const AvaliacaoController = require('./apps/controllers/AvaliacaoController');

const authSchema = require('./schemas/auth_schema.json');
const codigoSchema = require('./schemas/codigo_schema.json');
const resetPasswordSchema = require('./schemas/reset_password_schema.json');
const createUsuarioSchema = require('./schemas/create_usuario_schema.json');
const createFilmeSchema = require('./schemas/create_filme_schema.json');
const createAvaliacaoSchema = require('./schemas/create_avaliacao_schema.json');
const updateUsuarioSchema = require('./schemas/update_usuario_schema.json');
const updateFilmeSchema = require('./schemas/update_filme_schema.json');
const updateAvaliacaoSchema = require('./schemas/update_avaliacao_schema.json');

const routes = new Router();

routes.post('/register', schemaValidator(createUsuarioSchema), UsuarioController.create);
routes.post('/login', schemaValidator(authSchema), AutenticadorController.autenticar);
routes.post('/login/recuperar_senha', schemaValidator(codigoSchema), AutenticadorController.esqueciSenha);
routes.put('/login/recuperar_senha/confirmar', schemaValidator(resetPasswordSchema), AutenticadorController.resetaSenha);

routes.use(AutenticadorMiddleware);

routes.put('/user/update', schemaValidator(updateUsuarioSchema), UsuarioController.update);
routes.delete('/user/delete', UsuarioController.delete);


routes.get('/filmes/list-filme/:id', FilmeController.listOne);
routes.get('/filmes/list-all-filmes', FilmeController.listAll);

routes.post('/filmes/list-filme/:id/create-avaliacao', schemaValidator(createAvaliacaoSchema), AvaliacaoController.create);
routes.put('/filmes/list-filme/:id/update-avaliacao', schemaValidator(updateAvaliacaoSchema), AvaliacaoController.update);
routes.delete('/filmes/list-filme/:id/delete-avaliacao', AvaliacaoController.delete);
routes.get('/filmes/list-filme/:id/list-avaliacao', AvaliacaoController.list);

routes.use(AutenticadorIsAdmin);

routes.post('/filmes/create-filme', upload.single('capa'), convertType,
    schemaValidator(createFilmeSchema), FilmeController.create);
routes.put('/filmes/update-filme/:id', upload.single('capa'), convertType,
    schemaValidator(updateFilmeSchema), FilmeController.update);
routes.delete('/filmes/delete-filme/:id', FilmeController.delete);

module.exports = routes;