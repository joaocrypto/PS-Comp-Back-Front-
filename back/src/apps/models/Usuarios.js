const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Usuarios extends Model {
    static init(sequelize){
        super.init(
            {
                email: Sequelize.STRING,
                user: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
            },
            {
                sequelize,
            },
        );
        return this;
    }
}

module.exports = Usuarios;