import { useAuthContext } from "../../hooks"

import {
    useNavigate
} from 'react-router-dom';
import { useEffect } from "react";

const PrivateRoute = ({children}) => {

    const {user} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate('/');
    },[user])

    return(
        <>
            {children}
        </>
    )
}

export default PrivateRoute;