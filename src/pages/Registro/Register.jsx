import Style from './Register.module.css'
import GoTask from '../../assets/logoGT.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const url = "http://localhost:3000/responsaveis"

const Register = () => {
  const navigate = useNavigate();

  const [Nome_Resp, setNomeResp] = useState("");  
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [ConfirmaSenha, setConfSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!Nome_Resp || !Email || !Senha || !ConfirmaSenha) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (Senha !== ConfirmaSenha) {
      alert('A senha e a confirmação de senha não coincidem');
      return;
    }

    const user = { Nome_Resp, Email, Senha };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert("Usuário cadastrado com sucesso");
        setNomeResp("");  
        setEmail("");
        setSenha("");
        setConfSenha("");
        navigate("/"); // Redireciona após o cadastro
      } else {
        alert('Erro ao cadastrar o usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro no servidor');
    }
  }

  return (
    <div className={Style.divPrincipalRegister}>
      
      <div className={Style.arrowMain1}>
        <Link to={'/'}>      
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </Link>
        <div></div>
        <div></div>
      </div>

      <form className={Style.mainFormRegister} onSubmit={handleSubmit}>

        <div className={Style.formRegister}>

        <label htmlFor="nome_Resp">Nome de usuário</label>
          <input 
            type="text"
            name="Nome_Resp"
            id="nome_Resp"
            value={Nome_Resp}
            onChange={(e) => setNomeResp(e.target.value)} 
            className={Style.inputRegister}
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)} 
            className={Style.inputRegister}
          />

          <label htmlFor="senha">Senha</label>
          <input 
            type="password"
            name="Senha" 
            id="senha"
            value={Senha}
            onChange={(e) => setSenha(e.target.value)} 
            className={Style.inputRegister}
          />

          <label htmlFor="confirmaSenha">Confirmar senha</label>
          <input 
            type="password"
            name="confirmaSenha" 
            id="confirmaSenha"
            value={ConfirmaSenha}
            onChange={(e) => setConfSenha(e.target.value)} 
            className={Style.inputRegister}
          />

          <img src={GoTask} alt="GoTask Logo" className={Style.imgGoTask} />
        </div>

        <button type="submit" className={Style.buttonRegister}>Cadastrar-se</button>
      </form>
    </div>
  )
}

export default Register;
