import "./Auth.css";
import Message from "../../components/Message";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { resetPassword, reset } from "../../slices/authSlice";

const ResetPassword = () => {

    const [email, setEmail] = useState(() => {
        return localStorage.getItem("recoveryEmail" || "");
    });
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [erroValidacao, setErroValidacao] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!codigo.trim() || !email.trim() || !password || !confirmPassword) {
            console.log(codigo, email)
            setErroValidacao("Todos os campos são obrigatórios!");
            return;
        }

        const apenasNumeros = /^\d+$/.test(codigo);

        if ((codigo.length < 6) && !apenasNumeros) {
            setErroValidacao("O código precisa ter no mínimo 6 números!");
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

        const data = {
            email,
            codigo,
            password,
            confirmPassword
        };
        setErroValidacao("");
        dispatch(resetPassword(data));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            localStorage.removeItem("recoveryEmail");
            navigate("/auth/login");
        }
    }, [success, navigate]);

    return (
        <div id="reset-password">
            <h2>CineRate</h2>
            <p className="subtitle">Redefinir Senha</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="Código de Recuperação" 
                    onChange={(e) => setCodigo(e.target.value)}
                    value={codigo || ""}
                />
                <input 
                    type="password" placeholder="Nova Senha" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ""}
                />
                <input 
                    type="password" placeholder="Confirme a Nova Senha" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword || ""}
                    
                />
                <input type="submit" value={loading ? "Atualizando..." : "Redefinir Senha"} disabled={loading} />
                {erroValidacao && <Message msg={erroValidacao} type="error" />}
                {!erroValidacao && error && <Message msg={error} type="error" />}
                {success && <Message msg="Senha redefinida com sucesso!" type="success" />}
            </form>
            <p>
                <Link to="/auth/login">Voltar para Login</Link>
            </p>
        </div>
    );
};

export default ResetPassword;
