import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/login');
    }, [])
    
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
}

export default ProtectedRoute;