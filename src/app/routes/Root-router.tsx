import { Route, Routes } from 'react-router-dom'
import { MainPage } from '../../components/main-page/Main-page.tsx'
import { TaskPage } from '../../components/task-page/Task-page.tsx'


export const RootRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/:taskId?' element={<TaskPage />} />
    </Routes>
  )
}