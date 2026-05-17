const Usuarios = require('../models/Usuarios');
const { Op } = require('sequelize');

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
                return res.status(400).json({error: 'Usuario já existe!'});
            }

            let admin = false;

            if (req.is_admin === true) {
                admin = is_admin;
            }

            if (password !== confirmPassword) {
                return res.status(401).json({error: 'As senhas não coincidem!'})
            }

            const usuario = await Usuarios.create({
                user,
                email,
                password,
                is_admin: admin,
            });
            
            if (!usuario) {
                return res.status(400).json({error: 'Falha ao criar usuário!'})
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

    async update(req, res){
        try{
            const { user, email, password, newPassword, confirmPassword } = req.body;
            
            

            const verificaUsuario = await Usuarios.findByPk(req.userId);

            if (!verificaUsuario) {
                return res.status(400).json({error: 'Usuario não encontrado!'});
            }
            
            if (user) verificaUsuario.user = user;

            if (email) {
                if (await Usuarios.findOne({
                    where: {
                        email,
                        id: {
                            [Op.ne]: req.userId
                        }
                    }
                })) {
                    return res.status(400).json({error: 'Email já existe!'});
                }
                verificaUsuario.email = email;
            }

            if (password) {

                if (!await verificaUsuario.checkPassword(password)) {
                    return res.status(401).json({error: 'Senha atual incorreta!'});
                }
                
                if (!newPassword || !confirmPassword) {
                    return res.status(401).json({error: 'É necessário uma nova senha e a confirmação da mesma!'});
                }

                if (newPassword !== confirmPassword) {
                    return res.status(401).json({error: 'As novas senhas não coincidem!'});
                }

                verificaUsuario.password = newPassword;
            }

            await verificaUsuario.save();
            
            return res.status(200).json({ message: 'Usuário atualizado!' });

        }catch(err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }    
    }


    async delete(req,res){
        try {
            const usuario = await Usuarios.findByPk(req.userId);
            
            if (!usuario) return res.status(400).json({ error: "Usuário não encontrado" });

            await Usuarios.destroy({
                where: {
                    id: req.userId
                }
            });
            
            return res.status(200).json({ message: "Usuário deletado!" });
            
        } catch (err) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }
}

module.exports = new UsuarioController();