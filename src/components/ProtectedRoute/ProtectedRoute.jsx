import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts';

const ProtectedRoute = ({children}) => {
    const {isAuthorized} = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isAuthorized){
            navigate('/login');
        }
    }, [])
    
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
}

export default ProtectedRoute;