import { useState } from 'react';
import './App.css';
import FormLogin from './components/FormLogin';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Home from './components/Home'
<<<<<<< HEAD

import Store from './components/Store'
import CadBeneficio from './components/CadBeneficio'
=======
import Config from './components/Config.jsx'
import Store from './components/Store'
import TaskScreen from './components/TaskScreen.jsx';
import FamilyScreen from './components/FamilyScreen.jsx';
>>>>>>> Teste
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>  {/* Aqui inicia o Router */}
      <div>
        <Routes>
          <Route path="/" element={<FormLogin />} /> {/* Página de Login */}
          // tela de resgatar a senha
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Página de Esqueceu Senha */}
          // tela de registro
          <Route path="/register" element={<Register />} /> {/* Página de Cadastro */}
          // casa
          <Route path='/Home' element ={<Home/>} />
          // loja
          <Route path='/Store' element ={<Store/>}/>
<<<<<<< HEAD
          <Route path='/cad-beneficio' element ={<CadBeneficio/>}/>
=======
          // config
          <Route path='/Config' element ={<Config/>}/> 
          // tabela de task
          <Route path='/TaskScreen' element ={<TaskScreen/>}/>
          // familia
          <Route path='/FamilyScreen' element ={<FamilyScreen/>}/>

>>>>>>> Teste
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
