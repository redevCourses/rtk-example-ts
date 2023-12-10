import React, {JSX, useEffect} from 'react'

import ToDoForm from '../../components/ToDoForm'
import {fetchGetTodos} from '../../redux/slices/todosSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

const ToDoExample = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { status, data, error } = useAppSelector(state => state.todos)

  useEffect(() => {
    const postData = () => {
      dispatch(fetchGetTodos())
    }
    postData()
  }, [dispatch])

  return (
    <div>
      <ToDoForm />
      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'failed' && (
        <p>
          {error}
          <div>Возможно забыл token добавить</div>
        </p>
      )}
      {status === 'succeeded' &&
        data &&
        data.map(({ id, title }, index) => {
          return (
            <div key={id}>
              <h2>
                {index} : {title}
              </h2>
            </div>
          )
        })}
      {status === 'succeeded' && data?.length === 0 && <p>Тут пусто 🫙</p>}
    </div>
  )
}

export default ToDoExample
