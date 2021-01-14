import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { ADD_PROJECT, FORM_PROJECT, GET_PROJECTS, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from '../../types';
import clientAxios from '../../config/axios'

const ProjectState = props => {

    const initialState = {
        projects : [],
        form: false,
        errorform: false,
        project: null,
        messagge: null
    }

    // Dispatch for run actions
    const [ state, dispatch ] = useReducer(projectReducer, initialState);

    // Show form for creating a new project
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    // Get Projects
    const getProjects = async () => {
        try {
            const response = await clientAxios.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            })

        } catch (error) {
            console.log(error.response)
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // Add new project
    const addProject = async project => {

        try {
            const response = await clientAxios.post('/api/projects', project);
            console.log(response);

            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })

        } catch (error) {
            console.log(error.response)
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // Validate form for errors
    const showError = state => {
        dispatch({
            type: VALIDATE_FORM,
            payload: state
        })
    }

    // Select a project
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    // Delete a project
    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })

        } catch (error) {
            console.log(error.response)
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
        value={{
            projects: state.projects,
            form: state.form,
            errorform: state.errorform,
            project: state.project,
            messagge: state.messagge,
            showForm,
            getProjects,
            addProject,
            showError,
            actualProject,
            deleteProject
        }}>
            {props.children}
        </projectContext.Provider>
    )

}

export default ProjectState;