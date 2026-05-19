const Sequelize = require('sequelize');
const Usuarios = require('../apps/models/Usuarios');
const Filmes = require('../apps/models/Filmes');
const Avaliacoes = require('../apps/models/Avaliacoes');

const models = [Usuarios, Filmes, Avaliacoes];
const databaseConfig = require('../configs/db');

class Database {
    constructor() {
        this.init();
    };

    init(){
        this.connection = new Sequelize(databaseConfig);

        models
        .map((model) => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }


}

module.exports = new Database();