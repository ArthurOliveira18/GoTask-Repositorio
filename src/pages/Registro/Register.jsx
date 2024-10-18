import Style from './Register.module.css'
import GoTask from '../../assets/logoGT.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const url = "http://localhost:5000/pais"

const Register = () => {
  const navigate = useNavigate()

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if (!nome == "") {
      if (!email == "") {
        if (!password == "") {
          console.log('Usuario cadastrado')
          const user = { nome, email, password };
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          alert("Usuário cadastrado com sucesso");
          setNome("");
          setEmail("");
          setPassword("");
          
          navigate("/");
        } else{
          alert('Campo de senha esta vazio')
        }

      } else{
        alert('Campo de email esta vazio')
      }
    } else{
      alert('Campo de nome esta vazio')
    }
  }
  

  return (
    <div className={Style.divPrincipalRegister}>
      
      <div className={Style.arrowMain1}>
        {/* criei essas outras divs vazias apenas para  */}

        <Link to={'/'}>      
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </Link>

        <div></div>
        
        <div></div>
      </div>

      <form className={Style.mainFormRegister} onSubmit={handleSubmit}>

        {/* Div contendo todos os elementos tirando o button. */}
          <div className={Style.formRegister}>
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email" 
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }} 
            
            className={Style.inputRegister}
            />

            <label htmlFor="password">Senha</label>
            <input 
            type="password"
            name="password" 
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }} 
            
            className={Style.inputRegister}
            />

            <label htmlFor="username">Nome de usuario</label>
            <input 
            type="text"
            name="username" 
            id="username"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }} 
           
            className={Style.inputRegister}
            />

            <img src={GoTask} alt=""  className={Style.imgGoTask}/>

          
          </div>

            <button type='submit' className={Style.buttonRegister}>Cadastrar-se</button>
        </form>
    </div>
  )
}

export default Register