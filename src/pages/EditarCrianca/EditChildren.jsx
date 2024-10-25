import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import { useState } from 'react';
import style from './EditChildren.module.css';

const EditChildren = () => {
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
        { id: 10, task: 'Se amar.' },
    ]);

    return (
        <div className={style.pageContainer}>
            <HeaderMain />
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
                    <p>Tasks atribuidas</p>
                    {tasks.map((tarefa) => (
                        <div key={tarefa.id} className={style.divInfoTask}>
                            <p>{tarefa.task}</p>
                        </div>
                    ))}
                </div>
            </div>
            <FooterMain />
        </div>
    );
};

export default EditChildren;
