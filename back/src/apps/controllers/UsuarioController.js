const Usuarios = require('../models/Usuarios');

class UsuarioController {
    async create(req, res){
        try{
        const verificaUsuario = await Usuarios.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (verificaUsuario) {
            return res.status(400).json({message: 'Usuario já existe!'});
        }

        const usuario = await Usuarios.create(req.body);
        
        if (!usuario) {
            return res.send(400).json({message: 'Falha ao criar usuário!'})
        }

        return res.send({ usuario });
        }catch(err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }    
    }
}

module.exports = new UsuarioController();