const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class Usuarios extends Model {
    static init(sequelize){
        super.init(
            {
                email: Sequelize.STRING,
                user: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                password_reset_codigo: Sequelize.STRING,
                password_reset_expira: Sequelize.DATE,
                password: Sequelize.VIRTUAL,
                is_admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            },
        );            
        
        this.addHook('beforeSave', async (usuario) => {
            if (usuario.password) {
                usuario.password_hash = await bcryptjs.hash(usuario.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}

module.exports = Usuarios;