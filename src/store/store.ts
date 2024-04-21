import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from './slices/tasks-slice.ts'


const rootReducer = combineReducers({
  tasksReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch