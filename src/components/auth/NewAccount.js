import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const NewAccount = () => {

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

        // Validation of password with a minimum of 6 chars

        // Check if both passwords are the same

        // Pass the value

    }
    

    return ( 
        <div className="form-usuario">
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