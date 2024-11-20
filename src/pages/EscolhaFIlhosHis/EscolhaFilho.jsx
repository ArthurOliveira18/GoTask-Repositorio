import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from './EscolhaFilho.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:3000/children'

const EscolhaFilho = () => {

    const [children, setChildren] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("benefit"); // Estado para alternar entre Benefício e Tasks
    const navigate = useNavigate();

    const handleNavigateBenef = () => {
        navigate('/historico-benef');
    };

    const handleNavigateTasks = () => {
        navigate('/historico-task');
    };

    const openModal = (child) => {
        console.log("Objeto criança selecionada:", child); // Verifique se o objeto está correto
        if (child.idCrianca) { // Verifique a propriedade correta 'idCrianca'
            localStorage.setItem('selectedChildId', child.idCrianca); // Atualiza o ID no localStorage
            setSelectedUser(child); // Define o filho selecionado
            console.log("id da criança selecionada:", child.idCrianca); // Exibe o id da criança selecionada
        } else {
            console.error("ID da criança não encontrado!");
        }
    };
    

    const closeModal = () => {
        setSelectedUser(null);
    };

    // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
    const user = JSON.parse(localStorage.getItem('user'));

    // Acessa o idResp dentro do objeto 'user'
    const idResp = user ? user.idResp : null;

    // Função para buscar os dados das crianças
    const fetchChildren = async () => {
        try {
            // Faz a requisição para o servidor para buscar todas as crianças
            const response = await axios.get(url); // Endpoint para buscar crianças

            // Acessa os dados retornados, que estão no response.data
            const allChildren = response.data;
            console.log("Dados das crianças recebidos:", allChildren); // Verifique os dados recebidos

            // Filtra as crianças que têm o mesmo responsavelId que o idResp
            const filteredChildren = allChildren.filter(child => child.responsavel === parseInt(idResp));
            setChildren(filteredChildren);

        } catch (error) {
            console.error("Erro ao buscar crianças:", error);
        }
    };

    useEffect(() => {
        fetchChildren();
    }, []);

    return (
        <div className={style.pageContainer}>
            <HeaderMain />
            <div className={style.pageMain}>
                {children.map((child, index) => (
                    <div key={index} className={style.userCard} onClick={() => openModal(child)}>
                        <div className={style.profileIcon}>
                            <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
                        </div>
                        <div className={style.printIcon}>
                            <h1>{child.nomeCrianca}</h1>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedUser && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div className={style.modalContent}>

                        {/* Aba de navegação entre Benefício e Tasks */}
                        <div className={style.tabContainer}>
                            <div className={style.divBlueModal} onClick={handleNavigateTasks}>
                                <div className={style.divWhiteModal}>
                                    <h1>Tasks</h1>
                                </div>
                            </div>

                            <div className={style.divBlueModal} onClick={handleNavigateBenef}>
                                <div className={style.divWhiteModal}>
                                    <h1>Benefícios</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <FooterMain />
        </div>
    );
};

export default EscolhaFilho;
