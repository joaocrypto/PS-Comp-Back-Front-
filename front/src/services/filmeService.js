import { api, requestConfig } from '../utils/config';


const createFilme = async(data, token) => {

    const config = requestConfig("POST", data, token, true);

    try {
        
        const res = await fetch(api + "/filmes/create-filme", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const updateFilme = async(data, id, token, image) => {

    const config = requestConfig("PUT", data, token, image);

    try {
        
        const res = await fetch(api + "/filmes/update-filme" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const deleteFilme = async(data, id, token) => {

    const config = requestConfig("DELETE", data, token);

    try {
        
        const res = await fetch(api + "/filmes/delete-filme" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const getFilme = async(data, id, token) => {

    const config = requestConfig("GET", data, token);

    try {
        
        const res = await fetch(api + "/filmes/list-filme" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const getAllFilmes = async(data, token) => {

    const config = requestConfig("GET", data, token);

    try {
        
        const res = await fetch(api + "/filmes/list-all-filmes", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};


const filmeService = {
  createFilme,
  updateFilme,
  deleteFilme,
  getFilme,
  getAllFilmes,
};

export default filmeService;
