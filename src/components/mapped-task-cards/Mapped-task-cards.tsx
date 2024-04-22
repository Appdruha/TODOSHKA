import { Fragment, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks.ts'
import { TaskCard } from '../task-card/Task-card.tsx'
import { Button, ButtonGroup, Modal } from '@mui/material'
import { CreateTask } from '../create-task/Create-task.tsx'
import { deleteTask } from '../../store/slices/tasks-slice.ts'
import { Task } from '../../types/Task.ts'

interface MappedTaskCardsProps {
  tasks: Task[] | null
  parentTaskId: string | null
  name?: string
  description?: string
  date?: string
}

export const MappedTaskCards = ({ tasks, parentTaskId, name, description, date }: MappedTaskCardsProps) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingTaskIds, setDeletingTaskIds] = useState<string[]>([])

  const handleDeleteBtnClick = () => {
    if (isDeleting) {
      deletingTaskIds.forEach(taskId => dispatch(deleteTask({ parentTaskId, taskId })))
      setIsDeleting(false)
    } else {
      setIsDeleting(true)
    }
  }

  return (
    <>
      {tasks && tasks.map(task =>
        <Fragment key={task.id}>
          <TaskCard
            parentTaskId={parentTaskId}
            id={task.id}
            name={task.name}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            childTasks={task.childTasks}
          />
          {isDeleting && !deletingTaskIds.includes(task.id) &&
            <Button onClick={() => setDeletingTaskIds([...deletingTaskIds, task.id])}>Удалить</Button>
          }
        </Fragment>,
      )
      }
      <ButtonGroup variant='text' sx={{ margin: '16px auto', display: 'flex', width: 'fit-content' }}>
        <Button onClick={() => setIsModalOpen(true)}>Создать задачу</Button>
        <Button onClick={() => handleDeleteBtnClick()}>{isDeleting ? 'Удалить выбранное' : 'Удалить задачи'}</Button>
      </ButtonGroup>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <CreateTask parentTaskId={parentTaskId} name={name} description={description} date={date} />
        </>
      </Modal>
    </>
  )
}