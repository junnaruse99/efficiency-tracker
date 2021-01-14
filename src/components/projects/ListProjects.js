import React, { useContext, useEffect } from 'react';
import SingleProject from './SingleProject';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const ListProjects = () => {

    // Extract projects from initial state
    const projectsContext = useContext(projectContext);
    const { projects, messagge, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;


    // Get projects when component get's loaded
    useEffect(() => {

        if(messagge) {
            showAlert(messagge.msg, messagge.category)
        }

        getProjects();
    // eslint-disable-next-line
    }, [messagge]);

    // Check if there is anything inside projects
    if( projects.length === 0 ) return <p>Start creating a new project!</p>;

    return ( 

        <ul className="listado-proyectos">
            { alert ? (<div className={`alert {alert.category}`}>{alert.msg}</div>): null}
            <TransitionGroup>
            {projects.map( project => (
                <CSSTransition
                    key={project._id}
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