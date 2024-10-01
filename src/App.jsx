import { useState } from 'react';
import './App.css';
import FormLogin from './components/FormLogin';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>  {/* Aqui inicia o Router */}
      <div>
        <Routes>
          <Route path="/" element={<FormLogin />} /> {/* Página de Login */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Página de Esqueceu Senha */}
          <Route path="/register" element={<Register />} /> {/* Página de Cadastro */}
          <Route path='/Home' element ={<Home/>} />
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
