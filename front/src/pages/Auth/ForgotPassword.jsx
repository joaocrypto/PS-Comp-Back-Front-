import "./Auth.css";
import Message from "../../components/Message";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { forgotPassword, reset } from "../../slices/authSlice";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email
        };

        dispatch(forgotPassword(data));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            localStorage.setItem("recoveryEmail", email);
            dispatch(reset());
            navigate("/auth/reset-password");
        }
    }, [success, navigate, dispatch, email]);

    return (
        <div id="forgot-password">
            <h2>CineRate</h2>
            <p className="subtitle">Recuperar Senha</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" placeholder="E-mail" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ""}
                />
                <input type="submit" value={loading ? "Enviando..." : "Enviar Código"} disabled={loading} />
                {error && <Message msg={error} type="error" />}
                {success && <Message msg="Código enviado com sucesso! Verifique seu email." type="success" />}
            </form>
            <p>
                <Link to="/auth/login">Voltar para Login</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
