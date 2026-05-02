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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email,
            codigo,
            password,
            confirmPassword
        };

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
                {error && <Message msg={error} type="error" />}
                {success && <Message msg="Senha redefinida com sucesso!" type="success" />}
            </form>
            <p>
                <Link to="/auth/login">Voltar para Login</Link>
            </p>
        </div>
    );
};

export default ResetPassword;
