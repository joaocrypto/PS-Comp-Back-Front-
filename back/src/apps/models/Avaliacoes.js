const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Avaliacoes extends Model {
    static init(sequelize){
        super.init(
            {
                comentario: Sequelize.STRING,
                nota: Sequelize.INTEGER,
            },
            {
                sequelize,
                indexes: [
                    {
                        unique: true,
                        fields: ['usuarioId', 'filmeId']
                    }
                ]
            },
        );            

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Usuarios, { foreignKey: 'usuarioId', as: 'usuario'  });
        this.belongsTo(models.Filmes, { foreignKey: 'filmeId', as: 'filme'  });
    }

}

module.exports = Avaliacoes;