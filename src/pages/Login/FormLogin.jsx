import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
import Style from './FormLogin.module.css';
import FoorterLogCad from '../../components/Logins/FoorterLogCad'
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
const url = "http://localhost:3000/responsaveis"

const FormLogin = () => {
  // Variáveis pro usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Definindo uma variável pro useNavigate
  const navigate = useNavigate();

  // Lista de usuários
  const [usuarios, setUsuarios] = useState([]);

  // Resgate de dados da API
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarregar a página

    const user = { email, password };

    // Verifica na lista de usuários se tem o usuário digitado
    const userToFind = usuarios.find(
      (userFind) => userFind.Email === user.email
    );

    // Confirmando se todas as credenciais estão corretas
    if (email && password) {
      if (userToFind && userToFind.Senha === password) {
        console.log(userToFind);
        alert("Login efetuado com sucesso");

        // Salva o usuário logado no localStorage (opcional)
        localStorage.setItem("user", JSON.stringify(userToFind));

        // Salva o id do responsável (idResp)
        localStorage.setItem("responsavelId", userToFind.idResp);
        console.log(localStorage.getItem("responsavelId")); // Verifique se o valor foi salvo corretamente
        // Adiciona o idResp no localStorage

        // Navega para a página Home após login bem-sucedido
        navigate('/Home');
      } else {
        alert("Usuário ou senha inválidos");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
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
