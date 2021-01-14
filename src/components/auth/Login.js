import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';


const Login = (props) => {

    // Extract the values from context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // Extract values for authentication
    const authContext = useContext(AuthContext);
    const { authenticate, messagge, logIn } = authContext;

    // Keep track of changes in messagge
    useEffect(() => {
        if(authenticate) {
            props.history.push('/projects');
        }
        if(messagge) {
            showAlert(messagge.msg, messagge.category);
        }
        // eslint-disable-next-line
    }, [authenticate, messagge, props.history]);

    // State for login
    const [ user, saveUser ] = useState({
        email: '',
        password: '',
    });

    // Extract user
    const { email, password } = user;

    // To keep track of user input
    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // when user wants to login
    const handleSubmit = e => {
        e.preventDefault();

        // Validation of empty fields
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are mandatory', 'alerta-error');
        }
        // Pass the value
        logIn({ email, password });
    }
    

    return ( 
        <div className="form-usuario">
            { alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>): null}
            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Login" /> 
                    </div>
                </form>

                <Link to={'/new-account'} className="enlace-cuenta">
                    Create an account
                </Link>
            </div>
        </div>
     );
}
 
export default Login;