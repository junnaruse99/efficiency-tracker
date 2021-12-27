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
    const { authenticate, messagge, registerUser, updateUser } = authContext;

    
    // State for login
    const [ user, saveUser ] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        isEmail: true,
        completePassword: true,
        matchPassword: true
    });

    // Extract user
    const { name, email, password, confirm, isEmail, completePassword, matchPassword } = user;


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
        if( password.length === 0 ) {
        } else if(confirm === password && password.length < 6) {
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
    }, [authenticate, messagge, props.history, email, confirm, password]);

    // Keep track of change of email
    useEffect(() => {
        // Check the position of the '@'
        let position = 0;
        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) === '@') {
                position = i;
            }
        }

        // If there are character before and after '@' then is an email
        if (email.length === 0) {
        } else if (position === 0) {
            saveUser({
                ...user,
                isEmail: false
            })
        } else if (position !== 0 && email.length !== position + 1) {
            saveUser({
                ...user,
                isEmail: true
            })
        }
        // eslint-disable-next-line
    }, [email])


    // To keep track of user input
    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value,
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

        // Password must at least contains 6 characters
        if(!completePassword && password.length < 6) {
            showAlert('Password must be at least 6 characters', 'alerta-error');            
            return;
        }

        // Password and confirm must be the same
        if(!matchPassword) {            
            showAlert('Password must be the same', 'alerta-error');
            return;
        }

        // Check if user has created a demo account before
        let demoEmail = localStorage.getItem('demo-account');

        if (demoEmail) {
            updateUser(demoEmail, user);
            localStorage.removeItem('demo-account');
        } else {
            // Pass the value
            registerUser({
                name,
                email, 
                password
            })
        }
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
                    {isEmail ? null : (<p className='auth-form-error'>Email is incorrect</p>)}

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