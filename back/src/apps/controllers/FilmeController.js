const Filmes = require("../models/Filmes");

class FilmeController {
    async create(req, res){
        try {
            const { capa, titulo, genero, sinopse, ano } = req.body;


            if (ano > new Date().getFullYear()) {
                return res.status(400).json({ error: "Coloque uma data válida!" });
            }

            const filme = await Filmes.create({
                capa,
                titulo,
                genero,
                sinopse,
                ano,
            });

            if (!filme) {
                return res.status(400).json({error: 'Falha ao criar filme!'})
            }

            return res.status(201).json({
                capa: filme.capa,
                titulo: filme.titulo,
                genero: filme.genero,
                sinopse: filme.sinopse,
                ano: filme.ano,
            });

        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;

            const filme = await Filmes.findByPk(id);
            
            if (!filme) return res.status(400).json({ error: "Filme não existe" });

            const filmeDeletado = await Filmes.destroy({
                where: {
                    id,
                }
            });
            
            if (!filmeDeletado) {
                return res.status(400).json({error: 'Falha ao deletar filme!'})
            }

            return res.status(200).json({ message: "Filme deletado!" });

        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            const filme = await Filmes.findByPk(id);
            
            if (!filme) return res.status(400).json({ error: "Filme não existe" });

            const { capa, titulo, genero, sinopse, ano } = req.body;

            if (capa) filme.capa = capa;
            if (titulo) filme.titulo = titulo;
            if (genero) filme.genero = genero;
            if (sinopse) filme.sinopse = sinopse;
            if (ano) {
                if (ano > new Date().getFullYear() || ano <= 0) {
                    return res.status(400).json({ error: "Coloque uma data válida!" });
                }
                filme.ano = ano;
            }

            const filmeAtualizado = await filme.save();

            if (!filmeAtualizado) {
                return res.status(400).json({error: 'Falha ao deletar filme!'})
            }

            return res.status(200).json({ message: "Filme atualizado!" });

        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }
}

module.exports = new FilmeController();