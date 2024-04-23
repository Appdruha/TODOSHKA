import { Task } from '../../types/Task.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.ts'
import { findTaskById } from '../../utils/helpers/find-task.ts'
import { saveState } from '../../utils/helpers/save-state.ts'

interface InitialState {
  tasks: Task[] | null
}

const initialState: InitialState = {
  tasks: [
    {
      id: '1234',
      name: 'Какая-то задача',
      description: 'очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень длинное описание',
      date: '04/11/2024 12:00 am',
      isCompleted: false,
      childTasks: null,
    },
  ],
}

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    getSavedTasks: (state) => {
      const tasksString = localStorage.getItem('tasks')
      if (tasksString) {
        const tasks: Task[] = JSON.parse(tasksString)
        if (tasks.length) {
          state.tasks = tasks
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string, parentTaskId: string | null }>) => {
      if (!state.tasks) {
        throw new Error('no tasks')
      }
      if (!action.payload.parentTaskId) {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId)
      } else {
        const task = findTaskById({ tasksReducer: state }, action.payload.parentTaskId)
        if (task) {
          task.childTasks = task.childTasks!.filter(childTask => childTask.id !== action.payload.taskId)
        }
      }
      saveState({ tasksReducer: state })
    },
    editTask: (state, action: PayloadAction<{ taskId: string, newData: Task }>) => {
      const task = findTaskById({ tasksReducer: state }, action.payload.taskId)
      if (task) {
        Object.assign(task, action.payload.newData)
      }
      saveState({ tasksReducer: state })
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = findTaskById({ tasksReducer: state }, action.payload)

      const completeChildTasks = (tasks: Task[]) => {
        tasks.forEach(childTask => {
          childTask.isCompleted = true
          if (childTask.childTasks) {
            completeChildTasks(childTask.childTasks)
          }
        })
      }

      if (task) {
        task.isCompleted = true
        if (task.childTasks) {
          completeChildTasks(task.childTasks)
        }
      }
      saveState({ tasksReducer: state })
    },
    createTask: (state, action: PayloadAction<{ parentTaskId: string | null, task: Task }>) => {
      const { task, parentTaskId } = action.payload
      let isTaskAdded = false
      if (!state.tasks) {
        state.tasks = []
      }
      if (!parentTaskId) {
        state.tasks.push(task)
      } else {
        const insertTask = (tasks: Task[], parentId: string, currentTask: Task) => {
          tasks.forEach(task => {
            if (isTaskAdded) {
              return
            }
            if (task.id === parentId) {
              if (!task.childTasks) {
                task.childTasks = []
              }
              isTaskAdded = true
              return task.childTasks.push(currentTask)
            }
            if (task.childTasks) {
              insertTask(task.childTasks, parentId, currentTask)
            }
          })
        }

        insertTask(state.tasks, parentTaskId, task)
      }
      saveState({ tasksReducer: state })
    },
  },
})

export const { getSavedTasks, createTask, editTask, completeTask, deleteTask } = tasksSlice.actions
export const selectTaskById = (state: RootState, taskId: string | undefined): null | Task => {
  if (!taskId) {
    return null
  }
  return findTaskById(state, taskId)
}
export const tasksReducer = tasksSlice.reducer
