import "./Filme.css";

import Message from "../../components/Message";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useIsAdmin } from "../../hooks/useIsAdmin";
import { listOne } from "../../slices/filmeSlice";
import { createAvaliacao, resetMessage, listAvaliacao } from "../../slices/avaliacaoSlice";


const Filme = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const [nota, setNota] = useState("");    
  const [comentario, setComentario] = useState("");


  const { filme, error, loading } = useSelector((state) => state.filme);
  const { avaliacoes, message: messageAvaliacao, error: errorAvaliacao, loading: loadingAvaliacao } = useSelector((state) => state.avaliacao);
  console.log(avaliacoes);

  useEffect(() => {
    if (id) {
      dispatch(listOne(id));
      dispatch(listAvaliacao(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nota) {
      alert("Por favor, selecione uma nota antes de enviar.");
      return;
    }

    const avaliacao = {
      nota,
      comentario,
    };

    const checaState = await dispatch(createAvaliacao({avaliacao, id}));
    if (checaState.meta.requestStatus === "fulfilled") {
      setNota("");
      setComentario("");

      dispatch(listAvaliacao(id));
    }
    
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);

  };

  return (
    <div id="filme-page">
      <button className="voltar-btn" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      {loading ? (
        <Message msg="Carregando filme..." type="msg" />
      ) : error ? (
        <Message msg={error} type="error" />
      ) : (
        <>
          <div className="filme-detail-container">
            <div className="filme-card">
              <div className="filme-capa">
                {filme.capa ? (
                  <img src={filme.capa} alt={filme.titulo} />
                ) : (
                  <span>Sem imagem</span>
                )}
              </div>
              <div className="filme-info">
                <h1>{filme.titulo}</h1>
                <div className="filme-meta">
                  <span>{filme.genero}</span>
                  <span>{filme.ano}</span>
                </div>
                <p className="filme-sinopse">{filme.sinopse}</p>
                {isAdmin && (
                  <div className="filme-funcoes">
                    <div>
                      <button className="btn" onClick={() => navigate(-1)}>
                        Atualizar Filme
                      </button>
                    </div>
                    <div>
                      <button className="filme-delete" onClick={() => navigate(-1)}>
                        Excluir Filme
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="filme-avaliacoes">
            <div className="avaliacoes-info">
              <h2>Avaliações</h2>
              {avaliacoes && avaliacoes.length > 0 ? (
                <span>{avaliacoes.length} Comentários</span>
              ) :  (<span>Nenhum comentário</span>)}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="avaliacoes-avalia">
                <div className="form-nota">
                  <label>
                    <span>Nota:</span>
                    <input type="number" min="1" max="10"
                      onChange={(e) => setNota(e.target.value ? parseInt(e.target.value, 10) : "")}
                      value={nota || ""}
                    />
                  </label>
                </div>
                <div className="form-comentario">
                  <label>
                    <span>Comentário:</span>
                    <input className="input-avalia" type="text" placeholder="Escreva seu comentário:"
                      onChange={(e) => setComentario(e.target.value)}
                      value={comentario || ""}
                    />
                  </label>
                </div>
                    {!loadingAvaliacao && <input type="submit" value="Avaliar" />}
                    {loadingAvaliacao && <input type="submit" disabled value="Aguarde..." />}

              </div>
              {errorAvaliacao && <Message msg={errorAvaliacao} type="error" />}
              {messageAvaliacao && <Message msg={messageAvaliacao} type="success" />}
            </form>
            <section className="avaliacao-list">
              {avaliacoes && avaliacoes.length > 0 ? (
                avaliacoes.map((avaliac) => (
                  <div className="avaliacao-card" key={avaliac.id}>
                    <div className="avaliacao-top">
                      <strong>{avaliac.usuario?.user || "Usuário"}</strong>
                      <span className="avaliacao-nota">Nota: {avaliac.nota}/10</span>
                    </div>
                    <div>{avaliac.comentario ? (
                      avaliac.comentario
                    ) : (<strong>Sem comentário.</strong>)}</div>
                  </div>
                ))
              ) : (
                <span>Nenhuma avaliação ainda.</span>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Filme;
