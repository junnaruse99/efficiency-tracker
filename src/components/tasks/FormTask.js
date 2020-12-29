import React, { useState, useContext, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    // Extract project from state
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // Get state of tasks of project
    const tasksContext = useContext(taskContext);
    const { errortask, selectedtask, addTask, validateTask, modifyTask } = tasksContext;

    // State of form input
    const [ task, saveTask ] = useState({
        name: ''
    })

    // Effect that detects if there is a selected task
    useEffect( () => {
        if(selectedtask) {
            saveTask(selectedtask)
        }
    }, [ selectedtask ]);

    // Get values from task
    const { name } = task;

    if(!project) return null;

    // Read values of the form
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    // Add a new task
    const onSubmit = e => {

        e.preventDefault();

        // Validation
        if(name.trim() === "") {
            validateTask(true);
            return;
        }

        validateTask(false);
        
        // Pass validation
        task.projectID = project.id;
        task.state = false;

        // Check if editing or adding
        if(selectedtask) { // editing
            modifyTask(task);
        }  else { // new task
            addTask(task);
        }

        // Re-initialize form
        saveTask({
            name: ''
        });

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name ..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedtask ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>

            {errortask ? <p className="mensaje error">The task name is mandatory</p> : null}
        </div>
     );
}
 
export default FormTask;