import { SUCCESSFUL_REGISTRATION, ERROR_REGISTRATION, GET_USER, SUCCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SUCCESSFUL_LOGIN:
        case SUCCESSFUL_REGISTRATION:
            
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                messagge: null,
                loading: false
            }
            
        case GET_USER:
            return {
                ...state,
                authenticate: true,
                user: action.payload,
                loading: false
            }
        case LOG_OUT:
        case ERROR_REGISTRATION:
        case ERROR_LOGIN:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                user: null,
                authenticate: null,
                messagge: action.payload,
                loading: false
            }
        default:
            return state;
    }
}