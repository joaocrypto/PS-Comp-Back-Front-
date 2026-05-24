import "./Filme.css";

import Message from "../../components/Message";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useIsAdmin } from "../../hooks/useIsAdmin";
import { deleteFilme, listOne } from "../../slices/filmeSlice";
import { createAvaliacao, updateAvaliacao, deleteAvaliacao, resetMessage, listAvaliacao } from "../../slices/avaliacaoSlice";


const Filme = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const [nota, setNota] = useState("");    
  const [comentario, setComentario] = useState("");
  const [avaliacaoExistente, setAvaliacaoExistente] = useState(null);

  const { filme, error, loading } = useSelector((state) => state.filme);
  const { avaliacoes, message: messageAvaliacao, error: errorAvaliacao, loading: loadingAvaliacao } = useSelector((state) => state.avaliacao);
  const { usuario } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(listOne(id));
      dispatch(listAvaliacao(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  useEffect(() => {
    if (avaliacoes && usuario) {
      const minhaAvaliacao = avaliacoes.find(
        (avaliacao) => avaliacao.usuario?.id === usuario?.id
      );
      if (minhaAvaliacao) {
        setAvaliacaoExistente(minhaAvaliacao);
        setNota(minhaAvaliacao.nota);
        setComentario(minhaAvaliacao.comentario || "");
      } else {
        setAvaliacaoExistente(null);
        setNota("");
        setComentario("");
      }
    }
  }, [avaliacoes, usuario]);

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

    let checaState;
    
    if (avaliacaoExistente) {
      checaState = await dispatch(updateAvaliacao({avaliacao, id}));
    } else {
      checaState = await dispatch(createAvaliacao({avaliacao, id}));
    }

    if (checaState.meta.requestStatus === "fulfilled") {
      setNota("");
      setComentario("");

      dispatch(listAvaliacao(id));
    }
    
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);

  };

  const handleDeleteFilme = async () => {

    if (window.confirm("Tem certeza que deseja excluir este filme?")) {
      
      const checaState = await dispatch(deleteFilme(id));

      if (checaState.meta.requestStatus === "fulfilled") {
        alert("Filme excluído com sucesso!");
        navigate("/");
      }
    }
  };

  const handleDeleteAvaliacao = async () => {

    if (window.confirm("Tem certeza que deseja excluir sua avaliação?")) {
      
      const checaState = await dispatch(deleteAvaliacao(id));

      if (checaState.meta.requestStatus === "fulfilled") {
        setAvaliacaoExistente(null);
        setNota("");
        setComentario("");

        dispatch(listAvaliacao(id));
      }

      setTimeout(() => {
        dispatch(resetMessage());
      }, 2000);
    }
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
                      <button onClick={() => navigate('/filme/' + id + '/atualizar-filme')}>
                        Atualizar Filme
                      </button>
                    </div>
                    <div>
                      <button className="filme-delete" onClick={() => handleDeleteFilme()}>
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
                    {!loadingAvaliacao && <input type="submit" value={avaliacaoExistente ? "Atualizar" : "Avaliar"} />}
                    {loadingAvaliacao && <input type="submit" disabled value="Aguarde..." />}

              </div>
              {errorAvaliacao && <Message msg={errorAvaliacao} type="error" />}
              {messageAvaliacao && <Message msg={messageAvaliacao} type="success" />}
            </form>
            <section className="avaliacao-list">
              {avaliacoes && avaliacoes.length > 0 ? (
                avaliacoes.map((avaliac, index) => (
                  <div className="avaliacao-card" key={avaliac.id}>
                    <div className="avaliacao-top">
                      <strong>{avaliac.usuario?.user || "Usuário"}</strong>
                      <div className="avaliacao-top-right">
                        {avaliacaoExistente && (index === 0) && (
                          <div className="avaliacao-funcoes">
                            <div>
                              <button className="avaliacao-delete" onClick={() => handleDeleteAvaliacao()}>
                                Excluir Avaliação
                              </button>
                            </div>
                          </div>
                        )}
                        <span className="avaliacao-nota">Nota: {avaliac.nota}/10</span>
                      </div>
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
