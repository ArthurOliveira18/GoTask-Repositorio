import Style from '../styles/FormLogin.module.css';


const FormLogin = () => {
  return (
    <div className = {Style.formMain}>
      <form >
        <h1>aaAAAA</h1>

      <label htmlFor="email">Email</label>
        <div className={Style.divEmail}>
          <input type="email" name="email" id="email" required/>
        </div>

        <label htmlFor="password">Senha</label>
        <div className={Style.divPassword}>
          <input type="password" name="password" id="password" />
          <button type='submit' id='oii'>Entrar</button>
        </div>
        
        

      </form>
      
    </div>
  )
}

export default FormLogin