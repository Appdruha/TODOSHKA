import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Task } from '../../types/Task.ts'
import { ControlledTextField } from '../controlled-text-field/Controlled-text-field.tsx'
import { ControlledDateTimePicker } from '../controlled-date-time-picker/Controlled-date-time-picker.tsx'
import { Button } from '@mui/material'
import { v4 } from 'uuid'
import styles from './create-task.module.css'
import { useAppDispatch } from '../../hooks/redux-hooks.ts'
import { createTask } from '../../store/slices/tasks-slice.ts'

type Inputs = Omit<Task, 'id'>

export const CreateTask = () => {
  const dispatch = useAppDispatch()

  const formMethods = useForm<Inputs>({
    mode: 'onBlur',
  })

  const { handleSubmit } = formMethods

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const taskData = data as Task
    taskData.id = v4()
    console.log(taskData)
    dispatch(createTask({ parentTaskId: null, task: taskData }))
  }

  return (
    <FormProvider {...formMethods} >
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField name='name' label='Название' />
        <ControlledTextField name='description' label='Описание задачи' multiline={true} />
        <ControlledDateTimePicker name='date' label='Дата' />
        <Button type='submit'>Создать</Button>
      </form>
    </FormProvider>
  )
}