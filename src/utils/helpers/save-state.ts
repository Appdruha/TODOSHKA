import { RootState } from '../../store/store.ts'

export const saveState = (state: RootState) => {
  const tasks = state.tasksReducer.tasks
  localStorage.setItem('tasks', JSON.stringify(tasks))
}