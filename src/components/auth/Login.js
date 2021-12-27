import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';
import { v4 as uuidv4 } from 'uuid';

const Login = (props) => {

    // Extract the values from context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // Extract values for authentication
    const authContext = useContext(AuthContext);
    const { authenticate, messagge, logIn, registerUser } = authContext;

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

    // Know if it is demo account
    const handleDemo = () => {
        let demoId = localStorage.getItem('demo-account');
        
        if (demoId) {
            logIn({ email:demoId, password:'password' });
            return;
        }

        demoId = uuidv4();

        registerUser({
            name:"Demo User",
            email:`${demoId}@email.com`, 
            password:"password"
        });
        localStorage.setItem('demo-account', `${demoId}@email.com`);
    }

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
    
    console.log(`You are in ${process.env.NODE_EN}`);

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

                <div className="container-login">
                    <Link to={'/new-account'} className="enlace-cuenta">
                        Create an account
                    </Link>

                    <p
                        className="enlace-cuenta"
                        onClick={handleDemo}
                        >Demo account</p>
                </div>
            </div>
        </div>
     );
}
 
export default Login;