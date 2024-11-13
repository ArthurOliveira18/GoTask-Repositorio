import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import { useState, useEffect } from 'react';
import style from './EditChildren.module.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const url = "http://localhost:3000/task"

const EditChildren = () => {

    const navigate = useNavigate();
    // Função criada apenas para utilizar o useNavigate. Não sei pq em outras paginas ele não precisa disso...
    const handleNavigatePass = () => {
        navigate('/passagem-tela');
    };

    const [tasks, setTasks] = useState([

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
                    <p>Tasks</p>
                    {tasks.map((tarefa) => (
                        <div className={style.divPurpleWhite}>
                            <div key={tarefa.id} className={style.divInfoTask}>
                                <p>{tarefa.Nome_task}</p>
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
