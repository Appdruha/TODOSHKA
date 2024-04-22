import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { selectTaskById } from '../../store/slices/tasks-slice.ts'
import { MappedTaskCards } from '../mapped-task-cards/Mapped-task-cards.tsx'
import styles from './task-page.module.css'


export const TaskPage = () => {
  const taskId = useParams().taskId
  const task = useAppSelector(state => selectTaskById(state, taskId))

  if (!task || !taskId) {
    return (
      <h2>
        LOADING...
      </h2>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {task.name}
      </h2>
      <div className={styles.dataContainer}>
        <h3>Назначенная дата:</h3>
        <p>{task.date}</p>
      </div>
      <div className={styles.dataContainer}>
        <h3>Описание задачи:</h3>
        <p>{task.description}</p>
      </div>
      <h3 className={styles.dataContainer}>
        Дополнительные задачи:
      </h3>
      <MappedTaskCards
        tasks={task.childTasks}
        parentTaskId={taskId}
      />
    </div>
  )
}
