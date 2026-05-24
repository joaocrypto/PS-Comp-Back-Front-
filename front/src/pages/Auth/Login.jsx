import "./Auth.css";
import Message from "../../components/Message";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../../slices/authSlice";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erroValidacao, setErroValidacao] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            setErroValidacao("Todos os campos são obrigatórios!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErroValidacao("Insira um e-mail válido!");
            return;
        }

        if (password.length < 6) {
            setErroValidacao("A senha precisa ter no mínimo 6 caracteres!");
            return;
        }

        const credenciais = {
            email,
            password
        };

        setErroValidacao("");
        dispatch(login(credenciais));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div id="login">
            <h2>CineRate</h2>
            <p className="subtitle">Entre na sua conta</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" placeholder="E-mail" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ""}
                />
                <input 
                    type="password" placeholder="Senha" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ""}
                />
                <input type="submit" value={loading ? "Entrando..." : "Entrar"} disabled={loading} />
                {erroValidacao && <Message msg={erroValidacao} type="error" />}
                {!erroValidacao && error && <Message msg={error} type="error" />}
            </form>
            <p>
                Não tem conta? <Link to="/auth/register">Cadastrar</Link>
            </p>
            <p>
                Esqueceu a senha? <Link to="/auth/forgot-password">Recuperar</Link>
            </p>
        </div>
    );
};

export default Login;