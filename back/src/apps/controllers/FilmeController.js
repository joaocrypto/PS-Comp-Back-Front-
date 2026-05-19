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
}

module.exports = new FilmeController();