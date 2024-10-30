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
import PassagemTela from './pages/PassagemTela/PassagemTela.jsx';
import EditarCrianca from './pages/EditarCrianca/EditChildren.jsx';
import SelectDays from './pages/SelectDays/SelectDays.jsx';
import HistoricoTask from './pages/HistoricoTask/HistoricoTask.jsx';
import HistoricoBenef from './pages/HistoricoBenef/HistoricoBenef.jsx';
import EscolhaFilho from './pages/EscolhaFIlhosHis/EscolhaFilho.jsx';
import EditarTaskReal from './pages/Task/EditarTaskReal/EditarTaskReal.jsx';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScreenPdf from './pages/ImprimirPdf/ScreenPdf.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>  {/* Aqui inicia o Router */}
      {/* Coment apenas para dar um commit  */}
      <div>
        <Routes>
          {/* Página de Login */}
          <Route path="/" element={<FormLogin />} />

          {/* tela de resgatar a senha*/}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* tela de registro*/}
          <Route path="/register" element={<Register />} />

          {/* casa*/}
          <Route path='/Home' element={<Home />} />

          {/* loja*/}
          <Route path='/Store' element={<Store />} />

          {/* rota para os beneficios*/}
          <Route path='/cad-beneficio' element={<CadBeneficio />} />

          {/*Rota para as edits das recompensas*/}
          <Route path='/edit-recompensa' element={<EditRecompensa />} />

          {/* config*/}
          <Route path='/Config' element={<Config />} />

          {/* tabela de task*/}
          <Route path='/TaskScreen' element={<TaskScreen />} />

          {/* familia*/}
          <Route path='/FamilyScreen' element={<FamilyScreen />} />

          {/* Rota para pagina de editar lista de task*/}
          <Route path='/edit-list-task' element={<EditListTask />} />

          {/*Rota para pagina de criar task*/}
          <Route path='/create-task' element={<CreateTask />} />

          {/*Rota registrar criança */}
          <Route path='/register-children' element={<RegisterChildren />} />

          {/* Rota para tela de passagem para escolher as tasks */}
          <Route path='/passagem-tela' element={<PassagemTela />} />
          {/* Rota para pagina de editar a criança em especifico */}
          <Route path='/editar-crianca' element={<EditarCrianca />} />

          {/* Rota para a tela de selecionar os dias */}
          <Route path='/select-days' element={<SelectDays />} />

          {/* Rota para a tela de historico de tasks */}
          <Route path='/historico-task' element={<HistoricoTask />} />

          {/* Rota para a tela de historico de beneficio */}
          <Route path='/historico-benef' element={<HistoricoBenef />} />

          {/* Rota para a tela de escolher os filhos para ver qual historico, se é o de beneficio ou de tasks */}
          <Route path='/escolha-filho' element={<EscolhaFilho />} />

          {/* rota para imprimir o PDF  */}
          <Route path='/ScreenPdf' element={<ScreenPdf />}/>

          {/* rota para tela de editar task real  */}
          <Route path='/edit-task-real' element={<EditarTaskReal />}/>
        



        </Routes>
      </div>
    </Router>
  );
}

export default App;
