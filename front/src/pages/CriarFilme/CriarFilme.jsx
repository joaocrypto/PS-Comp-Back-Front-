import "./CriarFilme.css";

import Message from "../../components/Message";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createFilme, resetMessage } from "../../slices/filmeSlice";




const CriarFilme = () => {
    
    const [capa, setCapa] = useState("");    
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [ano, setAno] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [erroValidacao, setErroValidacao] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, loading } = useSelector((state) => state.filme);



    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (!capa || !titulo.trim() || !genero.trim() || !ano.trim() || !sinopse.trim()) {
            setErroValidacao("Todos os campos são obrigatórios!");
            return;
        }

        const apenasNumeros = /^\d+$/.test(ano);

        if (!apenasNumeros ) {
            setErroValidacao("O ano precisa ser um número!");
            return;
        }

        const anoNumero = Number(ano);

        if ((anoNumero > new Date().getFullYear())) {
            setErroValidacao("Digite um ano válido!");
            return;
        }

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

        setErroValidacao("");
        
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
    <div id="page">
        <button className="voltar" onClick={() => navigate(-1)}>
        ← Voltar
        </button>
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
                {erroValidacao && <Message msg={erroValidacao} type="error" />}
                {!erroValidacao && error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>

        </div>
    </div>
  )
}

export default CriarFilme