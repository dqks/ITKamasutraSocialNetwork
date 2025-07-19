import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const useAuth = () => {
    const location = useLocation();
    const auth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/login");
        } else {
            navigate(location)
        }
    }, [navigate, auth])
}