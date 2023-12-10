import { configureStore } from "@reduxjs/toolkit"

import tasksWithSlice from '../redux/slices/taskSlice'
import todosSlice from '../redux/slices/todosSlice'

export const store = configureStore({
  reducer: {
    tasksWithSlice: tasksWithSlice, // тут будет пример со Slice
    todos: todosSlice // тут будет пример с createAsyncThunk
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
















