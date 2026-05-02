import { api, requestConfig } from '../utils/config';


const register = async(data) => {

    const config = requestConfig("POST", data);

    try {
        
        const res = await fetch(api + "/register", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

const login = async(data) => {

    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/login", config)
        .then((res) => res.json())
        .catch((err) => err);

        if (res && res.token) {
            localStorage.setItem("usuario", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);
        }

        return res;

    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
}

const forgotPassword = async(data) => {

    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/login/recuperar_senha", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

const resetPassword = async(data) => {

    const config = requestConfig("PUT", data);

    try {
        const res = await fetch(api + "/login/recuperar_senha/confirmar", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

const authService = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
};

export default authService;