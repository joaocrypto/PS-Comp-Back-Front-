const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Filmes extends Model {
    static init(sequelize){
        super.init(
            {
                capa: Sequelize.STRING,
                titulo: Sequelize.STRING,
                genero: Sequelize.STRING,
                sinopse: Sequelize.STRING,
                ano: Sequelize.INTEGER,
            },
            {
                sequelize,
            },
        );            

        return this;
    }

}

module.exports = Filmes;