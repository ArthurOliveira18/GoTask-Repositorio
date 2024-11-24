import React, { useEffect, useState } from 'react';
import style from "./PdfMolde.module.css";

const Tabela = () => {
    const [tasksByDay, setTasksByDay] = useState({
        seg: [],
        ter: [],
        qua: [],
        qui: [],
        sex: [],
        fds: []
    });

    // Função para buscar as tarefas por dia (simula uma requisição)
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasksByDay/1');  // Altere a URL para o seu endpoint
            const data = await response.json();
            setTasksByDay(data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    // Chama a função de busca ao carregar o componente
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div id='conteudoPdf' className={style.container}>
            <div className={style.header}>Tarefas semanais - Juliana</div>

            <div className={style.days}>
                {['seg', 'ter', 'qua', 'qui', 'sex'].map((day) => (
                    <div key={day} className={style.day}>
                        <div className={style.dayTitle}>{day === 'seg' ? 'Segunda' : day === 'ter' ? 'Terça' : day === 'qua' ? 'Quarta' : day === 'qui' ? 'Quinta' : 'Sexta'}</div>
                        {tasksByDay[day].map((task, index) => (
                            <div key={index} className={style.task}>
                                {task} <span>+10 <input type="checkbox" /></span>
                            </div>
                        ))}
                        <div className={style.extras}>Extras:</div>
                    </div>
                ))}
            </div>

            <div className={style.weekend}>
                <div className={style.weekendTask}>
                    <div className={style.weekendTitle}>Final de semana</div>
                    {tasksByDay.fds.map((task, index) => (
                        <div key={index} className={style.task}>
                            {task} <span>+10 <input type="checkbox" /></span>
                        </div>
                    ))}
                    <div className={style.extras}>Extras:</div>
                </div>
            </div>

            <div className={style.store}>
                <div className={style.storeItem}>
                    <div className={style.storeTitle}>Loja de pontos</div>
                    <div className={style.task}>Dormir 25 minutos mais tarde <button>30 P</button></div>
                    <div className={style.task}>Jogar mais 30 min <button>30 P</button></div>
                    <div className={style.task}>Sair com os amigos <button>30 P</button></div>
                    <div className={style.task}>Ir no cinema <button>30 P</button></div>
                    <div className={style.task}>Ver desenho até mais tarde <button>30 P</button></div>
                </div>
            </div>

            <div className={style.totalPoints}>
                Total de pontos: <input type="text" className={style.pointsInput} disabled />
            </div>
        </div>
    );
};

export default Tabela;
