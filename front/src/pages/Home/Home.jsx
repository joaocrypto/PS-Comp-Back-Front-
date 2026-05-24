import "./Home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAll } from "../../slices/filmeSlice";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filmes, loading, error } = useSelector((state) => state.filme);

  useEffect(() => {
    dispatch(listAll());
  }, [dispatch]);

  return (
    <div id="home-page">
      <h1 className="home-titulo">Catálogo de Filmes</h1>

      {loading ? (
        <Message msg="Carregando catálogo de filmes..." type="msg" />
      ) : error ? (
        <Message msg={error} type="error" />
      ) : (
        <div className="filmes-list">
          {filmes.length > 0 ? (
            filmes.map((filme) => (
              <div className="filme-item-card" key={filme.id} onClick={() => navigate(`/filme/${filme.id}`)}>
                <div className="filme-item-capa">
                  {filme.capa ? (
                    <img src={filme.capa} alt={filme.titulo} />
                  ) : (
                    <span>Sem imagem</span>
                  )}
                </div>
                <h3 className="filme-item-titulo">{filme.titulo}</h3>
              </div>
            ))
          ) : (
            <p className="sem-filmes">Nenhum filme cadastrado no momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;