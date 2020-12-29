import React, { useReducer } from 'react';
import uuid from 'uuid/dist/v4';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { ADD_PROJECT, FORM_PROJECT, GET_PROJECTS, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT } from '../../types';


const ProjectState = props => {

    const projects = [
        { id: 1, name: 'Virtual shop' },
        { id: 2, name: 'Intranet' },
        { id: 3, name: 'Web Desing' }
    ]

    const initialState = {
        projects : [],
        form: false,
        errorform: false,
        project: null
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
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    // Add new project
    const addProject = project => {
        project.id = uuid();

        // Add project to state
        dispatch({
            type: ADD_PROJECT,
            payload: project
        })
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
    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }

    return (
        <projectContext.Provider
        value={{
            projects: state.projects,
            form: state.form,
            errorform: state.errorform,
            project: state.project,
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