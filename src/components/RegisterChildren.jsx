import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import style from '../styles/RegisterChildren.module.css'

const RegisterChildren = () => {
  return (
    <div>
        <div className={style.pageContainer/*pageContainerConfig*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainConfig*/}>
       <form className={style.formContainer}>
       <div className={style.inputGrup}>
        <label htmlFor="childName">Nome da Criança</label><br />
        <input type="text" placeholder='Digite o name da criança' id="childName" />
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
      <FooterMain/>
    </div>
      
    </div>
  )
}

export default RegisterChildren
