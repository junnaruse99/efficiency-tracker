import { SUCCESSFUL_REGISTRATION, ERROR_REGISTRATION, GET_USER, SUCCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SUCCESSFUL_LOGIN:
        case SUCCESSFUL_REGISTRATION:
            
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                messagge: null
            }
            
        case ERROR_REGISTRATION:
            return {
                ...state,
                token: null,
                messagge: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case ERROR_LOGIN:
            localStorage.removeItem('token');

            return {
                ...state,
                messagge: action.payload
            }
        case LOG_OUT:
            return {
            }
        default:
            return state;
    }
}