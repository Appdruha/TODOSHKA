import { Modal } from '@mui/material'
import { CreateTask } from './components/create-task/Create-task.tsx'

export const App = () => {
  return (
    <>
      <h1>Hearewgregreh</h1>
      <Modal open={true}>
        <>
          <CreateTask />
        </>
      </Modal>
    </>
  )
}