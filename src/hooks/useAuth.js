import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export const useAuth = () => {
    const location = useLocation();
    const auth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const params = useParams();
    let userId = params.userId;

    useEffect(() => {
        if (userId) {
            return
        } else if (!auth) {
            navigate("/login");
        } else {
            navigate(location)
        }
    }, [navigate, auth])
}