const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');
const  {encrypt} = require('../../utils/crypt');

class AutenticadorController {
    async autenticar(req, res) {
        
        const { email, password } = req.body;

        const usuario = await Usuarios.findOne({
            where: { email },
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario não encontrado!'});
        }

        if (!await usuario.checkPassword(password)) {
            return res.status(401).json({ error: 'Senhas não batem!'});
        }

        const { iv, content } = encrypt(usuario.id);
        const newId = `${iv}:${content}`;

        const token = jwt.sign({ userId: newId, is_admin: usuario.is_admin }, process.env.HASH_BCRYPT, {
            expiresIn: '7d'
        });

        return res.status(200).json({
            user: {
                id: usuario.id,
                user: usuario.user,
                is_admin: usuario.is_admin,
            },
            token,
        });
    }


}

module.exports = new AutenticadorController();