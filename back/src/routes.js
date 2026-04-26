const { Router } = require('express');
const UsuarioController = require('./apps/controllers/UsuarioController');

const routes = new Router();

routes.post('/usuario', UsuarioController.create);

routes.get('/', (req, res) => {
    return res.send({message: 'Connected'});
});

module.exports = routes;