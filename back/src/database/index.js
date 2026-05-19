const Sequelize = require('sequelize');
const Usuarios = require('../apps/models/Usuarios');
const Filmes = require('../apps/models/Filmes');

const models = [Usuarios, Filmes];
const databaseConfig = require('../configs/db');

class Database {
    constructor() {
        this.init();
    };

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map((model) => model.init(this.connection));
    }


}

module.exports = new Database();