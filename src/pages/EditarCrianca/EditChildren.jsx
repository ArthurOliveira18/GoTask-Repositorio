import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import { useState } from 'react';
import style from './EditChildren.module.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const EditChildren = () => {

    const navigate = useNavigate();
    // Função criada apenas para utilizar o useNavigate. Não sei pq em outras paginas ele não precisa disso...
    const handleNavigatePass = () => {
        navigate('/passagem-tela');
    };

    const [tasks, setTasks] = useState([
        { id: 1, task: 'Arrumar a cama' },
        { id: 2, task: 'Levar o Ozzy para passear' },
        { id: 3, task: 'Fazer dever de casa' },
        { id: 4, task: 'Lavar os pratos do almoço' },
        { id: 5, task: 'Fazer o dever de matemática' },
        { id: 6, task: 'Dormir mais cedo' },
        { id: 7, task: 'Cuidar da sua irmã' },
        { id: 8, task: 'Não fazer pirraça' },
        { id: 9, task: 'Brincar com o seu irmão' },
        { id: 10, task: 'Limpar o quarto' },
    ]);

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
                <div className={style.divEditChildren}>
                    <div className={style.divInfoChildren}>
                        <label htmlFor="name">Nome da criança</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className={style.divInfoChildren}>
                        <label htmlFor="date">Data de nascimento</label>
                        <input type="date" name="date" id="date" />
                    </div>
                </div>

                <div className={style.divEditTasks}>
                    <div className={style.divIcon} onClick={handleNavigatePass}>
                        <span className="material-symbols-outlined">edit</span>
                    </div>
                    <p>Tasks atribuidas</p>
                    {tasks.map((tarefa) => (
                        <div className={style.divPurpleWhite}>
                            <div key={tarefa.id} className={style.divInfoTask}>
                                <p>{tarefa.task}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FooterMain />
        </div>
    );
};

export default EditChildren;
