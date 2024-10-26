import HeaderMain from '../../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../../components/MainHeadFoot/Footer/FooterMain'
import style from '../RegistrarFilho/RegisterChildren.module.css'
import { Link, useNavigate } from 'react-router-dom'

const RegisterChildren = () => {

  const navigate = useNavigate();

  // Função criada apenas para utilizar o useNavigate. Não sei pq em outras paginas ele não precisa disso...
  const handleNavigate = () => {
    navigate('/passagem-tela');
  };
  return (

    <div className={style.pageContainer}>
      <HeaderMain />

      <div className={style.arrowMain1}>
        {/* criei essas outras divs vazias apenas para  */}

        <Link to={'/FamilyScreen'}>
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </Link>

        <div></div>

        <div></div>
      </div>

      <div className={style.pageMain}>
        <form className={style.formContainer}>
          <div className={style.inputGrup}>
            <label htmlFor="childName">Nome da Criança</label><br />
            <input type="text" placeholder='Digite o nome da criança' id="childName" />

          </div>

          <div className={style.inputGrup}>
            <label htmlFor="birthDate">Data de nascimento</label><br />
            <input type="date" id="birthDate" />
          </div>
        </form>

        <div>
          <button type='submit' className={style.buttonRegister}>Cadastrar</button>
        </div>


      </div>


      <FooterMain />
    </div>
  )
}

export default RegisterChildren
