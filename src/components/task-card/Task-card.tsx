import { Task } from '../../types/Task.ts'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../hooks/redux-hooks.ts'
import { completeTask } from '../../store/slices/tasks-slice.ts'
import styles from './task-card.module.css'

interface TaskProps extends Task {
  parentTaskId: string | null
}

export const TaskCard = ({ name, date, description, isCompleted, id, parentTaskId }: TaskProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleCardClick = (taskId: string) => {
    navigate(`/${taskId}`, {state: {parentTaskId}})
  }

  const handleCompleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dispatch(completeTask(id))
  }

  return (
    <div onClick={() => handleCardClick(id)} className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <h3>{name}</h3>
        <p>{date}</p>
      </div>
      <div className={styles.descriptionContainer}>
        <h4>Описание</h4>
        <p>{description}</p>
      </div>
      <div>
        <h4>Статус</h4>
        <p
          className={`${isCompleted ? styles.ready : styles.notReady}`}>{isCompleted ? 'Выполнена' : 'Не выполнена'}</p>
      </div>
      {!isCompleted &&
        <Button
          className={styles.completeBtn}
          sx={{ position: 'absolute' }}
          onClick={(e) => handleCompleteBtn(e)}>
          Выполнено
        </Button>
      }
    </div>
  )
}