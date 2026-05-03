import "./CriarFilme.css";



const CriarFilme = () => {
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
    }
  return (
    <div id="criar-filme">
        <h2>Criar filme</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Imagem:</span>
                <input type="file" />
            </label>
            <label>
                <span>Título:</span>
                <input type="text" placeholder="Digite o nome do filme" />
            </label>
            <label>
                <span>Gênero:</span>
                <input type="text" placeholder="Digite o gênero" />
            </label>
            <label>
                <span>Ano de criação:</span>
                <input type="text" placeholder="Digite o ano de criação" />
            </label>            
            <label>
                <span>Sinopse:</span>
                <input type="text" placeholder="Descrição do filme" />
            </label>

            <input type="submit" value="Criar" />
        </form>

    </div>
  )
}

export default CriarFilme