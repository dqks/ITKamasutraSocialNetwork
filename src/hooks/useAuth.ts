import {useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIsAuth} from "../redux/authSelectors";
import {useAppSelector} from "./redux";

export const useAuth = () => {
    const location = useLocation();
    const auth = useAppSelector(getIsAuth);
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