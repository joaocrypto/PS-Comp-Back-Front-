const Sequelize = require('sequelize');
const Avaliacoes = require("../models/Avaliacoes");
const Usuarios = require("../models/Usuarios");

class AvaliacaoController {
    async create(req, res){
        try {
            const filme_id = req.params.id;
            const usuario_id = req.userId;

            const { nota, comentario } = req.body;

            if (nota <= 0 || nota > 10) {
                return res.status(400).json({error: 'A nota deve ser um valor de 1 a 10!'});
            }

            const avaliacao = await Avaliacoes.create({
                nota,
                comentario,
                filme_id,
                usuario_id,
            });

            if (!avaliacao) {
                return res.status(400).json({error: 'Falha ao criar avaliacão!'});
            }

            return res.status(201).json({
                nota: avaliacao.nota,
                comentario: avaliacao.comentario,
                filme_id: avaliacao.filme_id,
            });

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: "Usuário limitado a uma avaliação por filme!" });
            }
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async delete(req, res){
        try {
            const filme_id = req.params.id;

            const usuario_id = req.userId;


            const avaliacao = await Avaliacoes.findOne({
                where: {
                    filme_id,
                    usuario_id,
                },
            });
            
            if (!avaliacao) return res.status(400).json({ error: "Avaliação não existe!" });

            const avaliacaoDeletada = await Avaliacoes.destroy({
                where: {
                    filme_id,
                    usuario_id,
                }
            });
            
            if (!avaliacaoDeletada) {
                return res.status(400).json({error: 'Falha ao deletar avaliação!'})
            }

            return res.status(200).json({ message: "Avaliação deletada!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async update(req, res){
        try {
            const filme_id = req.params.id;
            const usuario_id = req.userId;

            const { nota, comentario } = req.body;

            const avaliacao = await Avaliacoes.findOne({
                where: {
                    filme_id,
                    usuario_id,
                },
            });

            if (!avaliacao) {
                return res.status(400).json({error: 'Avaliação não existe!'});
            }

            if (nota) {
                if (nota <= 0 || nota > 10) {
                    return res.status(400).json({error: 'A nota deve ser um valor de 1 a 10!'});
                }
                avaliacao.nota = nota;
            }

            if (comentario) {
                avaliacao.comentario = comentario;
            }else avaliacao.comentario = null;

            avaliacao.save();

            return res.status(200).json({ message: 'Avaliação atualizada!' });

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: "Usuário limitado a uma avaliação por filme!" });
            }
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async list(req, res){
        try {
            const filme_id = req.params.id;
            const usuario_id = req.userId;

            const avaliacoes = await Avaliacoes.findAll({
                include: [
                    {
                        model: Usuarios, as: 'usuario', required: true,
                        attributes: ['id', 'user'],
                    }
                ],
                where: {
                    filme_id,
                },
                order: [
                    [
                        Sequelize.literal(`usuario_id = ${usuario_id}`),
                        'DESC'
                    ],
                    ['created_at', 'DESC']
                ]
            });

            if (!avaliacoes) return res.status(400).json({ error: "Falha ao buscar avaliações!" });
        
            const formattedAvaliacoes = [];
        
            for (const avaliacao of avaliacoes) {
                formattedAvaliacoes.push({
                    filme_id: avaliacao.filme_id,
                    nota: avaliacao.nota,
                    comentario: avaliacao.comentario,
                    usuario: avaliacao.usuario,
                });
            }    

            return res.status(201).json({data: formattedAvaliacoes});


        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

}

module.exports = new AvaliacaoController();