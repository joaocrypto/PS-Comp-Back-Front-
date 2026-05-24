import { api, requestConfig } from '../utils/config';

const createAvaliacao = async(data, id, token) => {
    const config = requestConfig("POST", data, token);

    try {
        
        const res = await fetch(api + "/filmes/list-filme/" + id + "/create-avaliacao", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const updateAvaliacao = async(data, id, token) => {

    const config = requestConfig("PUT", data, token);

    try {
        
        const res = await fetch(api + "/filmes/list-filme/" + id + "/update-avaliacao", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const deleteAvaliacao = async(id, token) => {

    const config = requestConfig("DELETE", null, token);

    try {
        
        const res = await fetch(api + "/filmes/list-filme/" + id + "/delete-avaliacao", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const getAvaliacoes = async(id, token) => {

    const config = requestConfig("GET", null, token);

    try {
        
        const res = await fetch(api + "/filmes/list-filme/" + id + "/list-avaliacao", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const avaliacaoService = {
  createAvaliacao,
  updateAvaliacao,
  deleteAvaliacao,
  getAvaliacoes,
};

export default avaliacaoService;