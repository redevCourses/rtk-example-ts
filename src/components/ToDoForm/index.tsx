import React, {FormEvent, JSX, useState} from 'react'

import { fetchPostTodos } from '../../redux/slices/todosSlice'
import {useAppDispatch} from "../../hooks/hooks";

const ToDoForm = () : JSX.Element => {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title) {
      dispatch(fetchPostTodos(title))
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Добавить задачу...'
      />
      <button type='submit'>Добавить</button>
    </form>
  )
}

export default ToDoForm
