import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';


const NewAccount = (props) => {

    // Extract the values from context
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // Extract values for authentication
    const authContext = useContext(AuthContext);
    const { authenticate, messagge, registerUser } = authContext;

    // In case that a user has registered or there is a duplicate register
    useEffect(() => {
        if(authenticate) {
            props.history.push('/projects');
        }
        if(messagge) {
            console.log(messagge);
            showAlert(messagge.msg, messagge.category);
        }
        // eslint-disable-next-line
    }, [authenticate, messagge, props.history]);

    // State for login
    const [ user, saveUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    // Extract user
    const { name, email, password, confirm } = user;

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
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('All fields are mandatory', 'alerta-error');
            return;
        }

        // Validation of password with a minimum of 6 chars
        if(password.length < 6) {
            showAlert('Password must be at least 6 characters', 'alerta-error');
            return;
        }

        // Check if both passwords are the same
        if(password !== confirm) {
            showAlert('Passwords are not the same', 'alerta-error');
        }

        // Pass the value
        registerUser({
            name,
            email, 
            password
        })
    }
    

    return ( 
        <div className="form-usuario">
            { alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div>): null}
            <div className="contenedor-form sombra-dark">
                <h1>Create an account</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
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
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Register" /> 
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Return to login
                </Link>
            </div>
        </div>
     );
}
 
export default NewAccount;