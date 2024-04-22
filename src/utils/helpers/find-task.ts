import { RootState } from '../../store/store.ts'
import { Task } from '../../types/Task.ts'

export const findTaskById = (state: RootState, taskId: string): null | Task => {
  const tasksState = state.tasksReducer
  if (!tasksState.tasks) {
    return null
  }

  let task: null | Task = null
  const findTask = (tasks: Task[], id: string) => {
    tasks.forEach(currentTask => {
      if (task) {
        return
      }
      if (currentTask.id === id) {
        return task = currentTask
      }
      if (currentTask.childTasks) {
        findTask(currentTask.childTasks, id)
      }
    })
  }
  findTask(tasksState.tasks, taskId)

  return task
}