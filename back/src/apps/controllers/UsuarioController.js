const Usuarios = require('../models/Usuarios');

class UsuarioController {
    async create(req, res){
        try{
            const { user, email, password, confirmPassword, is_admin } = req.body;
            
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

            if (password != confirmPassword) {
                return res.status(401).json({message: 'As senhas não coincidem!'})
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