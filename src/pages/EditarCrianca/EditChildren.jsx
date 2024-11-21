import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import { useState, useEffect } from 'react';
import style from './EditChildren.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditChildren = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [tasks, setTasks] = useState([]);
    // Recupera o ID da criança do localStorage
    const idCrianca = localStorage.getItem('selectedChildId');
    
    

    useEffect(() => {
        // Buscar dados da criança ao carregar a página
        const fetchChildData = async () => {
            try {
                console.log("Buscando dados da criança...");
                const response = await axios.get(`http://localhost:3000/children/${idCrianca}`);
                const { nomeCrianca, dtNasc, tasks } = response.data;

                // Formatar a data para o formato yyyy-MM-dd
                const formattedDate = new Date(dtNasc).toISOString().split('T')[0];

                setName(nomeCrianca);
                setBirthDate(formattedDate);  // Definir a data no formato correto
                setTasks(tasks || []);
                console.log("Dados da criança:", response.data);
            } catch (error) {
                console.error("Erro ao buscar dados da criança:", error);
                alert("Erro ao carregar os dados da criança.");
            }
        };

        fetchChildData();
    }, [idCrianca]);


    const handleUpdate = async () => {
        console.log("Iniciando atualização da criança...");
        console.log("Dados informados:", { name, birthDate });

        if (!name || !birthDate) {
            console.error("Campos obrigatórios não preenchidos.");
            alert("Preencha todos os campos!");
            return;
        }

        try {
            // Corrigindo o uso de idCrianca
            const response = await axios.put(`http://localhost:3000/children/${idCrianca}`, {
                nomeCrianca: name,
                dtNasc: birthDate,
            });

            console.log("Resposta do servidor:", response.data);
            alert(response.data.message);
            navigate('/FamilyScreen');
        } catch (error) {
            console.error("Erro ao atualizar criança:", error);
            alert("Erro ao atualizar criança. Verifique os dados e tente novamente.");
        }
    };


    const handleNavigatePass = () => {
        navigate('/passagem-tela');
    };

    return (
        <div className={style.pageContainer}>
            <HeaderMain />
            <div className={style.arrowMain1}>
                <Link to={'/FamilyScreen'}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div></div>
                <div></div>
            </div>
            <div className={style.pageMain}>
                <div className={style.divEditChildren}>
                    <div className={style.divInfoChildren}>
                        <label htmlFor="name">Nome da criança</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            style={{ textAlign: "center",  fontSize: "30px"}}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={style.divInfoChildren}>
                        <label htmlFor="date">Data de nascimento</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            style={{ textAlign: "center",  fontSize: "25px"}}
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className={style.buttonAtualizar}
                            onClick={handleUpdate}
                        >
                            Atualizar
                        </button>
                        <button type="submit" className={style.buttonExcluir}>
                            Excluir
                        </button>
                    </div>
                </div>
                <div className={style.divEditTasks}>
                    <div className={style.divIcon} onClick={handleNavigatePass}>
                        <span className="material-symbols-outlined">edit</span>
                    </div>
                    <p>Atribuir Tasks</p>
                    {tasks.map((tarefa) => (
                        <div key={tarefa.id} className={style.divPurpleWhite}>
                            <div className={style.divInfoTask}>
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
