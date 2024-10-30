import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import style from './HistoricoBenef.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


const HistoricoBenef = () => {

  const navigate = useNavigate();

  const [recompensas] = useState([
    { id: 1, name: 'Dormir duas horas mais tarde', points: 30, isActive: true  },
    { id: 2, name: 'Sair com os amigos', points: 70 },
    { id: 3, name: 'Brincar mais tempo com os amigos', points: 10, isActive: true  },
    { id: 4, name: 'Jogar por mais de uma hora', points: 20, isActive: true  },
    { id: 5, name: 'Ir ao cinema', points: 90, isActive: true  },
    { id: 6, name: 'Vê desenho até mais tarde', points: 25, isActive: true },
    { id: 6, name: 'Descansar ', points: 25, isActive: false },
    { id: 6, name: 'Fome', points: 25, isActive: true },
    { id: 6, name: 'No ideias aqui', points: 25, isActive: true },
    { id: 6, name: 'MAIONESE KKKKKKKKKKKKKK', points: 10000, isActive: false },
    { id: 6, name: 'Sem comentários sobre o Davi', points: 1, isActive: true },
    { id: 6, name: 'Cansei', points: 25, isActive: false },
    { id: 6, name: 'Desisto ', points: 25, isActive: false },
    { id: 6, name: 'Se amar', points: 25, isActive: true },
  ]);

  return (
    <div className={style.pageContainer/* nome da pagina*/}>
      <HeaderMain />
      <div className={style.pageMain/*nome da pagina*/}>
        {/* Conteudo padrao da pagina */}

        <div className={style.arrowMain1}>
          {/* criei essas outras divs vazias apenas para  */}

          <Link to={'/escolha-filho'}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>

          <div></div>

          <div></div>
        </div>

        <div className={style.itensBenef}>
          {recompensas.map((recomp) => (
            <div key={recomp.id}
              className={`${style.divBenefs} ${!recomp.isActive ? style.inactiveTask : ''}`}>
              <p>{recomp.name}</p>
              <br />
              <p>Pontos:</p>
              <h2>{recomp.points} P</h2>
            </div>
          ))}
        </div>
      </div>
      <FooterMain />
    </div>
  )
}

export default HistoricoBenef