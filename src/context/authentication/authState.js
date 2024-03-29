import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import { SUCCESSFUL_REGISTRATION, ERROR_REGISTRATION, GET_USER, SUCCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT, UPDATE_USER } from '../../types';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        user: null,
        messagge: null,
        loading: true
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    // Functions

    // Register a new user
    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);

            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            });

            // Get user
            authenticateUser();

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: ERROR_REGISTRATION,
                payload: alert
            });
        }
    }

    // Return the authenticated user
    const authenticateUser = async() => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token)
        }

        try {
            const response = await clientAxios.get('/api/auth');
            
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN
            })
        }
    }

    // When the user logs in
    const logIn = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);

            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });

            // Get user
            authenticateUser();

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            // In case the password does not contains 6 characters
            if(!error.response.data.msg) {
                alert.msg = error.response.data.errors[0].msg
            }
            
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            });
        }
    }

    // Log out
    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    // Change state of user
    const updateUser = async (email, user) => {
        try {
            const response = await clientAxios.put(`/api/users/${email}`, user );
 
            dispatch({
                type: UPDATE_USER,
                payload: response.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticate: state.authenticate,
                user: state.user,
                messagge: state.messagge,
                loading: state.loading,
                registerUser,
                authenticateUser,
                updateUser,
                logIn,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;