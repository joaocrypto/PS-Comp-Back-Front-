import "./CriarFilme.css";

import Message from "../../components/Message";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createFilme, resetMessage } from "../../slices/filmeSlice";



const CriarFilme = () => {
    
    const [capa, setCapa] = useState("");    
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [ano, setAno] = useState("");
    const [sinopse, setSinopse] = useState("");

    const dispatch = useDispatch();

    const { message, error, loading } = useSelector((state) => state.filme);



    const handleSubmit = async (e) => {
        
        e.preventDefault();

            const filme = {
            capa,
            titulo,
            genero,
            ano,
            sinopse,
        };

        const formData = new FormData();
        Object.keys(filme).forEach((key) =>
            formData.append(key, filme[key])
        );

        const checaState = await dispatch(createFilme(formData));

        if (checaState.meta.requestStatus === "fulfilled") {
            setCapa("");
            setTitulo("");
            setGenero("");
            setAno("");
            setSinopse("");
        }
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
        
    }
    
    useEffect(() => {
        dispatch(resetMessage());
    }, [dispatch]);

    const handleFile = (e) => {

        const image = e.target.files[0];

        setCapa(image);
    };

  return (
    <div id="criar-filme">
        <h2>Criar filme</h2>
        <div className="capa">
            {capa ? (
                      <img className="capa-imagem" src={URL.createObjectURL(capa)} alt={"Capa do Filme"} />
                  ) : (
                      <span>Sem imagem</span>
            )}
        </div>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile}/>
            </label>
            <label>
                <span>Título:</span>
                <input type="text" placeholder="Digite o nome do filme"
                    onChange={(e) => setTitulo(e.target.value)}
                    value={titulo || ""}
                />
            </label>
            <label>
                <span>Gênero:</span>
                <input type="text" placeholder="Digite o gênero"
                    onChange={(e) => setGenero(e.target.value)}
                    value={genero || ""}
                />
            </label>
            <label>
                <span>Ano de criação:</span>
                <input type="text" placeholder="Digite o ano de criação"
                    onChange={(e) => setAno(e.target.value)}
                    value={ano || ""}
                />
            </label>            
            <label>
                <span>Sinopse:</span>
                <input type="text" placeholder="Descrição do filme"
                    onChange={(e) => setSinopse(e.target.value)}
                    value={sinopse || ""}
                />
            </label>

            {!loading && <input type="submit" value="Criar" />}
            {loading && <input type="submit" disabled value="Aguarde..." />}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </form>

    </div>
  )
}

export default CriarFilme