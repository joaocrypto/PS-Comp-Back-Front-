const Avaliacoes = require("../models/Avaliacoes");

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
}

module.exports = new AvaliacaoController();