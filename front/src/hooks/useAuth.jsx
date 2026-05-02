import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
    
    const { token } = useSelector((state) => state.auth);

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (token) {
            setAuth(true);
        }else {
            setAuth(false);
        }

        setLoading(false);

    }, [token])

    return { auth, loading };
}