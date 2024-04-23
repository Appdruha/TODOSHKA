import { RootRouter } from './routes/Root-router.tsx'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/redux-hooks.ts'
import { getSavedTasks } from '../store/slices/tasks-slice.ts'
import styles from './app.module.css'

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSavedTasks())
  }, [])

  return (
    <main className={styles.container}>
      <RootRouter/>
    </main>
  )
}