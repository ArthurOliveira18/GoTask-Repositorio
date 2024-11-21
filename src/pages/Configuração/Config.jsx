import style from "./Config.module.css";
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Config = () => {
  const navigate = useNavigate();

  // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
  const user = JSON.parse(localStorage.getItem('user'));

  // Acessa o idResp dentro do objeto 'user'
  const idResponsavel = user ? user.idResp : null;


  console.log("Id do responsável: " + idResponsavel)
  const handleDeleteAccount = async () => {
    

    console.log(`Tentando excluir a conta com ID: ${idResponsavel}`);

    try {
      await axios.delete(`http://localhost:3000/responsaveis/${idResponsavel}`);
      alert("Conta excluída com sucesso!");
      navigate('/'); // Redirecionar após a exclusão
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao excluir conta.");
    }
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        <div className={style.divInputConfig}>
          <div>
            <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "40px" }}>
              manufacturing
            </span>
          </div>

          <div 
            className={style.divExcluir} 
            onClick={handleDeleteAccount} // Ao clicar na div, a função é chamada
            style={{ cursor: 'pointer' }} // Isso faz com que o cursor mude para uma mãozinha, indicando que é clicável
          >
            <h2>Excluir conta</h2>
          </div>
        </div>
        <div className={style.divButtonSair}>
          <Link to='/'>
            <button>SAIR DA CONTA</button>
          </Link>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default Config;
