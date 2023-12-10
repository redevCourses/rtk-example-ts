import React, {FormEvent, JSX, useState} from 'react'

import { addTask } from '../../redux/slices/taskSlice'
import {useAppDispatch} from '../../hooks/hooks';

const AddTaskForm = () : JSX.Element => {
  const [taskText, setTaskText] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (taskText) {
      dispatch(addTask(taskText))
      setTaskText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder='Добавить задачу...'
      />
      <button type='submit'>Добавить</button>
    </form>
  )
}

export default AddTaskForm
