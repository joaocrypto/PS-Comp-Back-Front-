import "./Auth.css";


import { Link } from "react-router-dom";
import Message from "../../components/Message";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { register, reset } from "../../slices/authSlice";

const Register = () => {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [erroValidacao, setErroValidacao] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.trim() || !email.trim() || !password || !confirmPassword) {
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

        if (password !== confirmPassword) {
            setErroValidacao("As senhas não coincidem!");
            return;
        }

            const usuario = {
            user,
            email,
            password,
            confirmPassword,
            is_admin: isAdmin
        };
        
        setErroValidacao("");

        dispatch(register(usuario));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    

  return (
    <div id="register">
        <h2>CineRate</h2>
        <p className="subtitle">Cadastre-se</p>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" placeholder="Usuário" 
                onChange={(e) => setUser(e.target.value)}
                value={user || ""}
            />
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
            <input 
                type="password" placeholder="Confirme a senha" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword || ""}
            />
            <input type="submit" value={loading ? "Cadastrando..." : "Cadastrar"} disabled={loading} />
            {erroValidacao && <Message msg={erroValidacao} type="error" />}
            {!erroValidacao && error && <Message msg={error} type="error" />}
        </form>
        <p>
            Já tem conta? <Link to="/auth/login">Entrar</Link>
        </p>
    </div>
    
  )
}

export default Register