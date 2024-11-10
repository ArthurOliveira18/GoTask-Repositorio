import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from "./FamilyScreen.module.css";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const FamilyScreen = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Cristiano"
    },
    {
      id: 2,
      name: "Juliana"
    },
    {
      id: 3,
      name: "Enzo"
    }
  ]);

  const navigate = useNavigate();

  // Função criada apenas para utilizar o useNavigate.
  const handleNavigate = () => {
    navigate('/editar-crianca');
  };

  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        {users.map((user, index) => (
          <div
            key={index}
            className={style.userCard}
            onClick={(e) => {
              // Verifica se o clique não foi no link do print
              if (!e.target.closest('.printLink')) {
                handleNavigate();
              }
            }}
          >
            <div className={style.profileIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
            </div>
            <div className={style.printIcon}>
              <h1>{user.name}</h1>
              <Link to={'/ScreenPdf'} className="printLink">
                <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>print</span>
              </Link>
            </div>
          </div>
        ))}

        <div>
          <button
            className={style.addButton}
            onClick={() => navigate('/register-children')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>add</span>
          </button>
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default FamilyScreen;

