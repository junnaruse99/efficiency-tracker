import React, { useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ListTask = () => {

    // Get state of projects
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    // Get state of tasks of project
    const tasksContext = useContext(taskContext);
    const { projecttasks } = tasksContext;

    if(!project) return <h2>Select a project</h2>;

    return ( 
        <>
            <h2>Project: {project.name}</h2>

            <ul className="listado-tareas">
                {projecttasks.length === 0
                    ? (<li className="tarea"><p>There are no tasks</p></li>)
                    : <TransitionGroup>
                        {
                            projecttasks.map( task => (
                                <CSSTransition
                                    key={task._id}
                                    timeout={100}
                                    className="tarea"
                                >
                                    <Task 
                                        task={task}
                                    />
                                </CSSTransition>
                            ))
                        }     
                    </TransitionGroup>
                }

            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => deleteProject(project._id)}
            >Delete Project &times;</button>
        </>
     );
}
 
export default ListTask;