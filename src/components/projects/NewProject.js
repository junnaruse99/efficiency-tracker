import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Get state of form
    const projectsContext = useContext(projectContext);
    const { form, errorform, showForm, addProject, showError } = projectsContext;

    // State for the project
    const [ project, saveProject ] = useState({
        name: ''
    });

    const { name } = project
    // Keep track of the form inputs
    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        });
    };

    // When user wants to add a new project
    const onSubmitProject = e => {
        e.preventDefault();

        // Validation
        if (name.trim() === "") {
            showError(true)
            return;
        }

        showError(false)

        // Update state
        addProject(project);

        // Reset form
        saveProject({
            name: ''
        })

    }

    return ( 
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >Create a new project</button>

            {
                form
                ? 
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProject}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Name of the project"
                                name="name"
                                value={name}
                                onChange={onChangeProject}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Add new Project"
                            />
                
                        </form>
                    )
                : null }
            { errorform ? <p className="mensaje error">The name of the project is mandatory</p> : null}
        </>
     );
}
 
export default NewProject;