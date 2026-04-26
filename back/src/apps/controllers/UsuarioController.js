const Usuarios = require('../models/Usuarios');

class UsuarioController {
    async create(req, res){
        try{
            const { user, email, password, is_admin } = req.body;
            
            const verificaUsuario = await Usuarios.findOne({
                where: {
                    email,
                },
            });

            if (verificaUsuario) {
                return res.status(400).json({message: 'Usuario já existe!'});
            }

            let admin = false;

            if (req.is_admin === true) {
                admin = is_admin;
            }

            const usuario = await Usuarios.create({
                user,
                email,
                password,
                is_admin: admin,
            });
            
            if (!usuario) {
                return res.status(400).json({message: 'Falha ao criar usuário!'})
            }

            return res.status(201).json({
                id: usuario.id,
                user: usuario.user,
                email: usuario.email,
                is_admin: usuario.is_admin,
            });

        }catch(err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }    
    }
}

module.exports = new UsuarioController();