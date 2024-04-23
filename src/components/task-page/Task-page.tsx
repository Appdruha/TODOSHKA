import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks.ts'
import { completeTask, deleteTask, selectTaskById } from '../../store/slices/tasks-slice.ts'
import { MappedTaskCards } from '../mapped-task-cards/Mapped-task-cards.tsx'
import { Button, ButtonGroup, Modal } from '@mui/material'
import { CreateTask } from '../create-task/Create-task.tsx'
import { useState } from 'react'
import styles from './task-page.module.css'

export const TaskPage = () => {
  const dispatch = useAppDispatch()
  const taskId = useParams().taskId
  const task = useAppSelector(state => selectTaskById(state, taskId))
  const navigate = useNavigate()
  const parentTaskId: string = useLocation().state.parentTaskId

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteBtnClick = () => {
    if (taskId) {
      dispatch(deleteTask({ taskId, parentTaskId }))
      navigate(-1)
    } else {
      throw new Error('No task id')
    }
  }

  const handleBackBtnClick = () => {
    navigate(-1)
  }

  const handleCompleteBtnClick = () => {
    if (taskId) {
      dispatch(completeTask(taskId))
    } else {
      throw new Error('No task id')
    }
  }

  if (!task || !taskId) {
    return (
      <h2>
        LOADING...
      </h2>
    )
  }

  return (
    <div className={styles.container}>
      <ButtonGroup variant='text' sx={{ margin: '16px auto', display: 'flex', width: 'fit-content' }}>
        <Button onClick={() => handleBackBtnClick()}>Назад</Button>
        {!task.isCompleted && <Button onClick={() => setIsModalOpen(true)}>Редактировать</Button>}
        <Button onClick={() => handleDeleteBtnClick()}>Удалить</Button>
      </ButtonGroup>
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
      <div className={`${styles.dataContainer} ${styles.flexDataContainer}`}>
        <div>
          <h3>Статус</h3>
          <p
            className={`${task.isCompleted ? styles.ready : styles.notReady}`}>
            {task.isCompleted ? 'Выполнена' : 'Не выполнена'}
          </p>
        </div>
        {!task.isCompleted && <Button onClick={() => handleCompleteBtnClick()}>Выполнено</Button>}
      </div>
      <h3 className={styles.dataContainer}>
        Дополнительные задачи:
      </h3>
      <div className={styles.divider}></div>
      <MappedTaskCards
        tasks={task.childTasks}
        parentTaskId={taskId}
        isCompleted={task.isCompleted}
      />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <CreateTask parentTaskId={parentTaskId} name={task.name} description={task.description} date={task.date}
                      taskToEditId={taskId} />
        </>
      </Modal>
    </div>
  )
}
