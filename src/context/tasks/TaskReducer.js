import { TASK_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, TASK_STATE, ACTUAL_TASK, MODIFY_TASK } from '../../types';

export default ( state, action ) => {
    switch(action.type) {
        case TASK_PROJECT:
            return {
                ...state,
                projecttasks : action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projecttasks : [action.payload, ...state.projecttasks]
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errortask: action.payload 
            }
        case DELETE_TASK:
            return {
                ...state,
                projecttasks : state.projecttasks.filter(task => task._id !== action.payload)
            }
        case MODIFY_TASK:
            return {
                ...state,
                projecttasks: state.projecttasks.map(task => task._id === action.payload._id ? action.payload : task),
                selectedtask: null
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedtask: action.payload
            }
        default:
            return state;
    }
}