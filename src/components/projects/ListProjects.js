import React, { useContext, useEffect } from 'react';
import SingleProject from './SingleProject';
import projectContext from '../../context/projects/projectContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const ListProjects = () => {

    // Extract projects from initial state
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    // Get projects when component get's loaded
    useEffect(() => {
        getProjects();
    }, []);

    // Check if there is anything inside projects
    if( projects.length === 0 ) return <p>Start creating a new project!</p>;

    return ( 

        <ul className="listado-proyectos">
            <TransitionGroup>
            {projects.map( project => (
                <CSSTransition
                    key={project.id}
                    timeout={200}
                    className="proyecto"
                >
                    <SingleProject 
                        project={project} 
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>

    );
}
 
export default ListProjects;