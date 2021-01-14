import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';

const Task = ( { task } ) => {

    // Get state of tasks of project
    const tasksContext = useContext(taskContext);
    const { deleteTask, updateTask, saveActualTask } = tasksContext;


    // Function that modifies the state of a task
    const changeState = task => {
        if(task.state) {
            task.state = false;
        } else {
            task.state = true;
        }
        updateTask(task);
    }


    return ( 
        <li className="tarea sombre">
            <p>{task.name}</p>

            <div className="estado">
                {task.state
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => changeState(task)}
                        >Complete</button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => changeState(task)}
                        >Incomplete</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => saveActualTask(task)}
                >Edit</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deleteTask(task._id, task.projectId)}
                >Delete</button>
            </div>
        </li>
        
     );
}
 
export default Task;