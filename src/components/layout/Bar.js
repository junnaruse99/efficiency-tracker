import React, { useContext } from 'react';
import AuthContext from '../../context/authentication/authContext';

const Bar = () => {
    
    // Extract data from token
    const authContext = useContext(AuthContext);

    const { user, logOut } = authContext;

    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hello <span>{user.name}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={logOut}
                >Log out</button>

            </nav>
        </header>
     );
}
 
export default Bar;