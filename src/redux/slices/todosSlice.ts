import {createSlice} from '@reduxjs/toolkit'
import axios, {AxiosResponse} from 'axios'

import {createAppAsyncThunk} from '../../hooks/hooks';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
    },
})

export const todosApi = {
    getTodos() {
        return instance.get<TodoType[]>('todos');
    },
    postTodos(title: string) {
        return instance.post<TodoType, AxiosResponse<TodoType>, { title: string }>('todos', {title});
    },
}

// Создаем асинхронное действие с помощью createAsyncThunk
const fetchGetTodos = createAppAsyncThunk<TodoType[], undefined>('todos/fetchGetTodos', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    try {
        const {data} = await todosApi.getTodos()
        return data
    } catch (e) {
        const error = e as Error
        return rejectWithValue(error.message)
    }
})

const fetchPostTodos = createAppAsyncThunk<TodoType, string>('todos/fetchPostTodos', async (title: string) => {
    const {data} = await todosApi.postTodos(title)
    return data
})

export type TodoType = {
    isCompleted: boolean
    id: number
    title: string
    user_id: number
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    data: null as TodoType[] | null,
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetTodos.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchGetTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchGetTodos.rejected, (state, action) => {
                debugger
                state.status = 'failed'
                if (action.payload) {
                    state.error = action.payload
                }
            })
            .addCase(fetchPostTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (state.data) {
                    state.data.push(action.payload)
                }
            })
    }
})

export {fetchGetTodos, fetchPostTodos}
export default todosSlice.reducer
