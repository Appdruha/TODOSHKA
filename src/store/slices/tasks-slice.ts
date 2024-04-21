import { Task } from '../../types/Task.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  tasks: Task[] | null
}

const initialState: InitialState = {
  tasks: null,
}

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<{ parentTaskId: string | null, task: Task }>) => {
      const { task, parentTaskId } = action.payload
      if (!state.tasks) {
        state.tasks = []
      }
      if (!parentTaskId) {
        state.tasks.push(task)
      } else {
        debugger
        const insertTask = (tasks: Task[], parentId: string, currentTask: Task) => {
          tasks.forEach(task => {
            if (task.id === parentId) {
              if (!task.childTasks) {
                task.childTasks = []
              }
              return task.childTasks.push(currentTask)
            }
            if (task.childTasks) {
              insertTask(task.childTasks, parentId, currentTask)
            }
          })
        }

        insertTask(state.tasks, parentTaskId, task)
      }
    },
  },
})

export const { createTask } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
