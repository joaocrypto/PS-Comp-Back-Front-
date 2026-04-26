const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Usuarios = require('../models/Usuarios');
const transport = require('../../utils/mail');
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


    async esqueciSenha(req, res) {
        const { email } = req.body;

        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const codigo = crypto.randomInt(100000, 999999).toString();
        const expira = new Date();
        expira.setMinutes(expira.getMinutes() + 15);

        await usuario.update({
            password_reset_codigo: codigo,
            password_reset_expira: expira
        });


        try {
            await transport.sendMail({
                from: 'Suporte Cinerate <noreply@cinerate.com>',
                to: email,
                subject: 'Seu código de recuperação de senha',
                text: `Seu código de recuperação é: ${codigo}`,
                html: `<b>Seu código de recuperação é: ${codigo}</b><p>Ele expira em 15 minutos.</p>`
            });

            return res.json({ message: 'Email enviado com sucesso!' });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao enviar email' });
        }
    }


    async resetaSenha(req, res) {
        const { email, codigo, password } = req.body;

        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario || usuario.password_reset_codigo !== codigo) {
            return res.status(400).json({ error: 'Código inválido' });
        }

        if (new Date() > usuario.password_reset_expira) {
            return res.status(400).json({ error: 'Código expirado' });
        }

        usuario.password = password; 
        usuario.password_reset_codigo = null;
        usuario.password_reset_expira = null;

        await usuario.save();

        return res.json({ message: 'Senha alterada com sucesso!' });
    }


}

module.exports = new AutenticadorController();