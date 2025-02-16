import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes/Rotes/routes'



function App() {
  

  return (
    <>
      <div className='background-gray-500'>
        <RouterProvider router={router} />
      </div>      
    </>
  )
}

export default App
