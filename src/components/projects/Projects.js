import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';
import AuthContext from '../../context/authentication/authContext';

const Projects = () => {

    // Extract data from token
    const authContext = useContext(AuthContext);

    const { authenticateUser } = authContext;

    useEffect(() => {
        authenticateUser();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">

                <Bar />

                <main>
                    <FormTask />

                    <div className="contenedor-tareas">
                        <ListTask />
                    </div>
                </main>
            </div>
        </div>

     );
}
 
export default Projects;