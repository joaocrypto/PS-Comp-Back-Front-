import "./CriarFilme.css";

import Message from "../../components/Message";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateFilme, listOne, resetMessage } from "../../slices/filmeSlice";




const AtualizarFilme = () => {
    
    const { id } = useParams();

    const [capa, setCapa] = useState("");
    const [previewCapa, setPreviewCapa] = useState("");
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [ano, setAno] = useState("");
    const [sinopse, setSinopse] = useState("");

    const dispatch = useDispatch();

    const { filme, message, error, loading } = useSelector((state) => state.filme);


    useEffect(() => {
        dispatch(listOne(id));
    }, [dispatch]);

    useEffect(() => {
        if (filme) {
            setCapa(filme.capa);
            setTitulo(filme.titulo);
            setGenero(filme.genero);
            setAno(filme.ano);
            setSinopse(filme.sinopse);
        }
    }, [filme]);

    const handleSubmit = async (e) => {
        
        e.preventDefault();


        const attFilme = {};

        if (capa) {
            attFilme.capa = capa;
        }

        if (titulo) {
            attFilme.titulo = titulo;
        }

        if (genero) {
            attFilme.genero = genero;
        }

        if (ano) {
            attFilme.ano = ano;
        }

        if (sinopse) {
            attFilme.sinopse = sinopse;
        }

        const formData = new FormData();
        Object.keys(attFilme).forEach((key) =>
            formData.append(key, attFilme[key])
        );

        const checaState = await dispatch(updateFilme({formData, id}));

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

        setPreviewCapa(image);
        setCapa(image);
    };

  return (
    <div id="atualizar-filme">
      
        <button className="voltar-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        {loading ? (
        <Message msg="Carregando filme..." type="msg" />
      ) : error ? (
        <Message msg={error} type="error" />
      ) : (
            <>
                <h2>Atualizar filme</h2>
                <div className="capa">
                    {(filme.capa || previewCapa) ? (
                        <img
                            className="capa-imagem"
                            src={
                                previewCapa
                                    ? URL.createObjectURL(previewCapa)
                                    : filme.capa
                            }
                            alt={filme.titulo}
                        />
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

                    {!loading && <input type="submit" value="Atualizar" />}
                    {loading && <input type="submit" disabled value="Aguarde..." />}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </form>
            </>
      )}

    </div>
  )
}

export default AtualizarFilme