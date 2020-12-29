import React, { useReducer } from 'react';
import uuid from 'uuid/dist/v4';
import taskContext from './taskContext';
import TaskReducer from './TaskReducer';
import { TASK_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, TASK_STATE, ACTUAL_TASK, MODIFY_TASK } from '../../types';

const TaskState = props => {
    
    const initialState = {
        tasks: [
            {name: 'Choose platform', state: true, projectId: 1, id: 1},
            {name: 'Choose colors', state: false, projectId: 2, id: 2},
            {name: 'Choose pay method', state: true, projectId: 3, id: 3},
            {name: 'Choose hosting', state: false, projectId: 2, id: 4},
            {name: 'Choose platform', state: true, projectId: 1, id: 5},
            {name: 'Choose colors', state: false, projectId: 1, id: 6},
            {name: 'Choose pay method', state: true, projectId: 2, id: 7},
            {name: 'Choose platform', state: true, projectId: 3, id: 8},
            {name: 'Choose colors', state: false, projectId: 2, id: 9},
            {name: 'Choose pay method', state: true, projectId: 1, id: 10}
        ],
        projecttasks : null,
        errortask: false,
        selectedtask: null
    }

    // Create dispatch and state
    const [ state, dispatch ] = useReducer(TaskReducer, initialState);

    // Get tasks from a project
    const getTasks = projectId => {
        dispatch({
            type: TASK_PROJECT,
            payload: projectId
        })
    }

    // Add a new task
    const addTask = task => {
        task.id = uuid();

        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    // Validate and shows an error
    const validateTask = state => {
        dispatch({
            type: VALIDATE_TASK,
            payload: state
        })
    }

    // Delete a task
    const deleteTask = taskId => {
        dispatch({
            type: DELETE_TASK,
            payload: taskId
        })
    }

    // Change state of task
    const changeTaskState = task => {
        dispatch({
            type: TASK_STATE,
            payload: task
        })
    }

    // Extract task for edit
    const saveActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    // Modify a task
    const modifyTask = task => {
        dispatch({
            type: MODIFY_TASK,
            payload: task
        })
    }

    return (
        <taskContext.Provider
            value={{
                tasks: state.tasks,
                projecttasks: state.projecttasks,
                errortask: state.errortask,
                selectedtask: state.selectedtask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                changeTaskState,
                saveActualTask, 
                modifyTask
            }}
        >
            {props.children}
        </taskContext.Provider>    
    )
}

export default TaskState;