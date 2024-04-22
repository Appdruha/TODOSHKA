import { RootRouter } from './routes/Root-router.tsx'
import styles from './app.module.css'


export const App = () => {
  return (
    <main className={styles.container}>
      <RootRouter/>
    </main>
  )
}