const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

class AutenticadorController {
    async autenticar(req, res) {
        
        const { email, user, password } = req.body;

        const usuario = await Usuarios.findOne({
            where: { email },
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario não encontrado!'});
        }

        if (!await usuario.checkPassword(password)) {
            return res.status(401).json({ error: 'Senhas não batem!'});
        }

        

        const token = jwt.sign({ id }, process.env.HASH_BCRYPT, {
            expiresIn: '7d'
        });

        return res.status(200).json({
            user: {
                id: usuario.id,
                user: usuario.user,
            },
            token,
        });
    }
}

module.exports = new AutenticadorController();