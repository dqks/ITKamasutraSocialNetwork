import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const useAuth = (isAuth) => {
    const navigation = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            return navigation("/login")
        }
    }, []);
}