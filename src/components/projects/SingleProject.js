import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const SingleProjects = ( { project } ) => {

    // Get state of project
    const projectsContext = useContext(projectContext);
    const {  actualProject } = projectsContext;
    
    // Get state of tasks
    const tasksContext = useContext(taskContext);
    const {  getTasks } = tasksContext;

    // Show selected project and tasks
    const selectProject = id => {
        actualProject(id); // Get the project by project id
        getTasks(id); // Get the tasks of the project by project id
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectProject(project._id) }
            >{project.name}</button>
        </li>
     );
}
 
export default SingleProjects;