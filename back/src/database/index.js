const Sequelize = require('sequelize');
const Usuarios = require('../apps/models/Usuarios');

const models = [Usuarios];
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