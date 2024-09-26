import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormLogin from './components/FormLogin'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
         <FormLogin/>
    </div>
  )
}

export default App
