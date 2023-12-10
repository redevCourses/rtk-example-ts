import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4} from 'uuid';

export type TaskType = {
    id:string
    text: string
    completed: boolean
}

const initialState: TaskType[] = []

// Создаем слайс
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.push({id: v4(), text: action.payload, completed: false})
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.find(task => task.id === action.payload)
            if (task) {
                task.completed = !task.completed
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            return state.filter(task => task.id !== action.payload)
        }
    }
})

export const {addTask, toggleTask, removeTask} = taskSlice.actions // автоматически генерируются экшены
export default taskSlice.reducer
