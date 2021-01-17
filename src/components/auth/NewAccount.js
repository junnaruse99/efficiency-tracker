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

    
    // State for login
    const [ user, saveUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        completePassword: false,
        matchPassword: true
    });

    // Extract user
    const { name, email, password, confirm, completePassword, matchPassword } = user;


    // In case that a user has registered or there is a duplicate register
    useEffect(() => {
        if(authenticate) {
            props.history.push('/projects');
        }
        if(messagge) {
            console.log(messagge);
            showAlert(messagge.msg, messagge.category);
        }

        // Check if passwords are the same in real time
        if(confirm === password && password.length < 6) {
            saveUser({
                ...user,
                matchPassword: true,
                completePassword: false
            });
        } else if(confirm === password && password.length >= 6){
            saveUser({
                ...user,
                matchPassword: true,
                completePassword: true
            });
        } else if(confirm !== password && password.length < 6){
            saveUser({
                ...user,
                matchPassword: false,
                completePassword: false
            });
        } else {
            saveUser({
                ...user,
                matchPassword: false,
                completePassword: true
            });
        }


        // eslint-disable-next-line
    }, [authenticate, messagge, props.history, confirm, password]);

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

        // Password and confirm must be the same
        if(!matchPassword) {
            return;
        }

        // Password must at least contains 6 characters
        if(!completePassword) {
            return;
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
                    {completePassword ? null : (<p className='auth-form-error'>Password must contain at least 6 characters</p>)}

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
                        {matchPassword ? null : (<p className='auth-form-error'>Password must be the same</p>)}
              
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