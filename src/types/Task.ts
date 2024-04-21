export interface Task {
  id: string
  name: string
  description: string
  date: string
  isCompleted: boolean
  childTasks: Task[] | null
}