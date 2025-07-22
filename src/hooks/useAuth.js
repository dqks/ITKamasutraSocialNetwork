import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "../redux/authSelectors";

export const useAuth = () => {
    const location = useLocation();
    const auth = useSelector(getIsAuth);
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