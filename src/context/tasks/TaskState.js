import React, { useReducer } from 'react';
import taskContext from './taskContext';
import TaskReducer from './TaskReducer';
import { TASK_PROJECT, ADD_TASK, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, MODIFY_TASK } from '../../types';
import clientAxios from '../../config/axios';

const TaskState = props => {
    
    const initialState = {
        projecttasks : [],
        errortask: false,
        selectedtask: null
    }

    // Create dispatch and state
    const [ state, dispatch ] = useReducer(TaskReducer, initialState);

    // Get tasks from a project
    const getTasks = async projectId => {
        try {
            const response = await clientAxios.get('/api/tasks', { params: { projectId } });

            dispatch({
                type: TASK_PROJECT,
                payload: response.data.tasks
            })

        } catch (error) {
            console.log(error.response);
        }
    }

    // Add a new task
    const addTask = async task => {

        try {
            
            const response = await clientAxios.post('./api/tasks', task);

            dispatch({
                type: ADD_TASK,
                payload: response.data
            })

        } catch (error) {
            console.log(error.response);
        }
    }

    // Validate and shows an error
    const validateTask = state => {
        dispatch({
            type: VALIDATE_TASK,
            payload: state
        })
    }

    // Delete a task
    const deleteTask = async (taskId, projectId) => {
        try {
            
            await clientAxios.delete(`/api/tasks/${taskId}`, { params: { projectId } });
            
            dispatch({
                type: DELETE_TASK,
                payload: taskId
            })

        } catch (error) {
            console.log(error.response);
        }
    }

    // Change state of task
    const updateTask = async task => {
        try {
            const response = await clientAxios.put(`/api/tasks/${task._id}`, task );

            dispatch({
                type: MODIFY_TASK,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    // Extract task for edit
    const saveActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    return (
        <taskContext.Provider
            value={{
                projecttasks: state.projecttasks,
                errortask: state.errortask,
                selectedtask: state.selectedtask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                updateTask,
                saveActualTask
            }}
        >
            {props.children}
        </taskContext.Provider>    
    )
}

export default TaskState;