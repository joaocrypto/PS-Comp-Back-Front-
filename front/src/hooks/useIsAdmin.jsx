import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useIsAdmin = () => {
    const { usuario } = useSelector((state) => state.auth);
    
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        if (usuario && usuario.is_admin) {
            setIsAdmin(true);
        }else {
            setIsAdmin(false);
        }
    }, [usuario])

    return isAdmin;
};
