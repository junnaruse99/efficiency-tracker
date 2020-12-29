import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {

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

        // Pass the value

    }
    

    return ( 
        <div className="form-usuario">
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