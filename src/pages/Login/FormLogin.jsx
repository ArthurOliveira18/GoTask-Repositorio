import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
import Style from './FormLogin.module.css';
import FoorterLogCad from '../../components/Logins/FoorterLogCad'
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
const url = "http://localhost:5000/pais"

const FormLogin = () => {

  // Variaveis pro usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Definindo uma variavel pro useNavigate
  const navigate = useNavigate(); 

  //Lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

   //Resgate de dados da API
   useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const users = await res.json();
        setUsuarios(users);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    console.log(usuarios);
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault(); // Evitar recarregar a página

    const user = { email, password };

     //Verifica na lista de usuarios se tem o usuario digitado
     const userToFind = usuarios.find(
      (userFind) => userFind.email == user.email
    );
    
    // Confirmando se todas credenciais são corretas
    if (email != "") {
      if (password != "") {
        if (userToFind != undefined && userToFind.password == password) {
          console.log(userToFind);
          console.log("entrou");
          

          alert("Login efetuado com Sucesso");
          navigate('/home')
          
          
        } else {
          
          alert("Usuário ou senha inválides");
        }
      } else {
        
        alert("O campo senha não pode ser vazio");
      }
    } else {
      
      alert("O campo email não pode ser vazio");
    }

  };

  return (
    <div className={Style.formMain}>
      <HeaderMain />

      <form onSubmit={handleSubmit} className={Style.formLogin}>
        <label htmlFor="email" className={Style.labelFormLogin}>Email</label>

        <div className={Style.divEmail}>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={Style.inputFormLogin}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          
        </div>

        <label htmlFor="password" className={Style.labelFormLogin}>Senha</label>
        <div className={Style.divPassword}>
          <input
            type="password"
            name="password"
            id="password"
            className={Style.inputFormLogin}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={Style.buttonForm}>Entrar</button>
        </div>
      </form>

    

      <FoorterLogCad />
    </div>
  );
};

export default FormLogin;
