import style from "./Config.module.css";
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import {Link} from 'react-router-dom'

import { useState, useEffect } from 'react';


const Config = () => {
    // Estado para armazenar os dados do usuário
    const [userData, setUserData] = useState({ Nome_Resp: '', Email: '' });

    useEffect(() => {
      // Busca os dados do usuário ao carregar o componente
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/responsaveis'); // Ajuste a URL conforme necessário
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
          }
          const data = await response.json();
          setUserData(data[0]); // Ajuste aqui se a resposta tiver estrutura diferente
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };
      fetchData();
    }, []);


  return (
    <div className={style.pageContainer/*pageContainerConfig*/}>
      <HeaderMain />
      <div className={style.pageMain/*pageMainConfig*/}>

      <div className={style.divInputPerfil}>
          <div>
            <span class="material-symbols-outlined" style={{color:"#fff", fontSize:"40px",}}>
              account_circle</span>
          </div>

          <div className={style.divPerfil}>
            <h2>{userData.Nome_Resp} - {userData.Email}</h2>
          </div>
        </div>
        <br />
      

        <div className={style.divInputConfig}>
          {/* Div contendo as outras divs com as opções de trocar nome de usuario  */}

          <div>
            <span className="material-symbols-outlined" style={{color:"#fff", fontSize:"40px"}}>
              manufacturing
            </span>
          </div>

          <div className={style.divExcluir}>
            <h2>Excluir conta</h2>
          </div>

        </div>
        <div className={style.divButtonSair}>
          {/* div apenas para o button */}
          <Link to='/'>
            <button>SAIR DA CONTA</button>
          </Link>
        </div>
      </div>
      <FooterMain />
    </div>
  )
}

export default Config