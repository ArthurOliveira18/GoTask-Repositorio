import  { useState } from 'react';
import style from './ItensStore.module.css';
import { useNavigate } from 'react-router-dom';

const ItensStore = () => {
  const navigate = useNavigate(); 

  const [tasks] = useState([
    { id: 1, task: 'Arrumar a cama' },
    { id: 2, task: 'Levar o Ozzy para passear' },
    { id: 3, task: 'Fazer dever de casa' },
    { id: 4, task: 'Lavar os pratos do almoço' },
    { id: 5, task: 'Fazer o dever de matemática' },
    { id: 6, task: 'Dormir mais cedo' },
    { id: 7, task: 'Cuidar da sua irmã' },
    { id: 8, task: 'Não fazer pirraça' },
    { id: 9, task: 'Brincar com o seu irmão' },
    { id: 10, task: 'Se amar.' },
  ]);

  const [users] = useState([
    { id: 1, name: 'Cristiano' },
    { id: 2, name: 'Juliana' },
    { id: 3, name: 'Enzo' },
  ]);

  const [recompensas] = useState([
    { id: 1, name: 'Dormir duas horas mais tarde', points: 30 },
    { id: 2, name: 'Sair com os amigos', points: 70 },
    { id: 3, name: 'Brincar mais tempo com os amigos', points: 10 },
    { id: 4, name: 'Jogar por mais de uma hora', points: 20 },
    { id: 5, name: 'Ir ao cinema', points: 90 },
    { id: 6, name: 'Vê desenho até mais tarde', points: 25 },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className={style.divMainItensStore}>
      <div className={style.itensBlue}>
        {recompensas.map((recomp) => (
          <div
            key={recomp.id}
            onClick={() => openModal(recomp)} // Abrindo o modal ao clicar
            style={{
              color: '#000',
              width: '40%',
              height: '20%',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              border: '5px solid #000',
              borderBottom: '10px solid #000',
              borderRadius: '1rem',
            }}
          >
            <p>{recomp.name}</p>
            <br />
            <p>Pontos:</p>
            <h2>{recomp.points} P</h2>
          </div>
        ))}
      </div>

      <div className={style.divButtonPoints}>
        <div>
          <button onClick={() => { navigate('/cad-beneficio') }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#593ACA' }}>
              add
            </span>
          </button>
        </div>
      </div>

      {selectedTask && (
        <div className={style.modalOverlay} onClick={closeModal}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            

          {users.map((usus) =>(
            <div className={style.divPurpleModal}>
                <div className={style.profileIcon}>
                  <span className="material-symbols-outlined" style={{fontSize:"40px"}}>person</span>
                </div>
              <div className={style.divChildrenModal}>
                <h1>{usus.name}</h1>
              </div>
            </div>

          ))}
           

            <div className={style.divIcon}>
              <button className={style.closeButton}>Resgatar</button>
              <span className="material-symbols-outlined" onClick={() => {navigate('/edit-recompensa')}}>edit</span>
            </div>
            <button onClick={closeModal} className={style.closeButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItensStore;
