import { useState } from 'react';
import './App.css';
import FormLogin from './pages/Login/FormLogin.jsx';
import ForgotPassword from './pages/ResgatarSenha/ForgotPassword.jsx';
import Register from './pages/Registro/Register.jsx';
import Home from './pages/Home/Home.jsx'
import Store from './pages/Loja/Store.jsx'
import CadBeneficio from './pages/Loja/CadastroBeneficio/CadBeneficio.jsx'
import Config from './pages/Configuração/Config.jsx'
import TaskScreen from './pages/Task/TaskScreen.jsx';
import FamilyScreen from './pages/Familia/FamilyScreen.jsx';
import EditRecompensa from './pages/Loja/EditarRecompensa/EditRecompensa.jsx';
import EditListTask from './pages/Task/EditarTask/EditListTask.jsx';
import CreateTask from './pages/Task/CriarTask/CreateTask.jsx';
import RegisterChildren from './pages/Familia/RegistrarFilho/RegisterChildren.jsx';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0);
  
  return (
    <Router>  {/* Aqui inicia o Router */}
      <div>
        <Routes> 
          {/* Página de Login */}
          <Route path="/" element={<FormLogin />} />

          {/* tela de resgatar a senha*/}
          <Route path="/forgot-password" element={<ForgotPassword />} /> 

          {/* tela de registro*/}
          <Route path="/register" element={<Register />} /> 

          {/* casa*/}
          <Route path='/Home' element ={<Home/>} />

          {/* loja*/}
          <Route path='/Store' element ={<Store/>}/> 

          {/* rota para os beneficios*/} 
          <Route path='/cad-beneficio' element ={<CadBeneficio/>}/>

          {/*Rota para as edits das recompensas*/}
          <Route path='/edit-recompensa' element ={<EditRecompensa/>}/>

          {/* config*/}
          <Route path='/Config' element ={<Config/>}/> 

          {/* tabela de task*/}
          <Route path='/TaskScreen' element ={<TaskScreen/>}/>

          {/* familia*/}
          <Route path='/FamilyScreen' element ={<FamilyScreen/>}/>

          {/* Rota para pagina de editar lista de task*/}
          <Route path='/edit-list-task' element ={<EditListTask/>}/>

          {/*Rota para pagina de criar task*/}
          <Route path='/create-task' element ={<CreateTask/>}/>

          {/*Rota registrar criança */}
          <Route path='/register-children' element ={<RegisterChildren/>}/>



        </Routes>
      </div>
    </Router>  
  );
}

export default App;
