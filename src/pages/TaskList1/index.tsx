import React, {JSX} from 'react'

import {toggleTask, removeTask} from '../../redux/slices/taskSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

const TaskList = () : JSX.Element => {
    const tasks = useAppSelector(state => state.tasksWithSlice)
    const dispatch = useAppDispatch()

    const handleToggle = (id: string) => {
        dispatch(toggleTask(id))
    }

    const handleRemove = (id: string) => {
        dispatch(removeTask(id))
    }

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggle(task.id)}
                    />
                    {task.text}
                    <button onClick={() => handleRemove(task.id)}>Удалить</button>
                </li>
            ))}
        </ul>
    )
}

export default TaskList
