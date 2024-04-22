import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { MappedTaskCards } from '../mapped-task-cards/Mapped-task-cards.tsx'

export const MainPage = () => {
  const { tasks } = useAppSelector(state => state.tasksReducer)

  return (
    <MappedTaskCards tasks={tasks} parentTaskId={null}/>
  )
}