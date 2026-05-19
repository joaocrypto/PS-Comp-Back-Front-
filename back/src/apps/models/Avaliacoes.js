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
                        fields: ['usuario_id', 'filme_id']
                    }
                ]
            },
        );            

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Usuarios, { foreignKey: 'usuario_id', as: 'usuario'  });
        this.belongsTo(models.Filmes, { foreignKey: 'filme_id', as: 'filme'  });
    }

}

module.exports = Avaliacoes;