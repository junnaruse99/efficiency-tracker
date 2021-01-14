import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AutchContext from '../../context/authentication/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    
    const authContext = useContext(AutchContext);
    const { authenticate, loading, authenticateUser } = authContext;

    useEffect(() => {
        authenticateUser()
        // eslint-disable-next-line
    }, []);

    return (  
        <Route {...props } render={props => !authenticate && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) }
        />
    );
}
 
export default PrivateRoute;