import { TASK_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, TASK_STATE, ACTUAL_TASK, MODIFY_TASK } from '../../types';

export default ( state, action ) => {
    switch(action.type) {
        case TASK_PROJECT:
            return {
                ...state,
                projecttasks : state.tasks.filter(task => task.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
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
                tasks : state.tasks.filter(task => task.id !== action.payload),
                projecttasks : state.projecttasks.filter(task => task.id !== action.payload)
            }
        case TASK_STATE:
        case MODIFY_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                projecttasks: state.projecttasks.map(task => task.id === action.payload.id ? action.payload : task),
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