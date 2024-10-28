import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from './EscolhaFilho.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EscolhaFilho = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Cristiano" },
        { id: 2, name: "Juliana" },
        { id: 3, name: "Enzo" }
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("benefit"); // Estado para alternar entre Benefício e Tasks
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/editar-crianca');
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setActiveTab("benefit"); // Define a aba inicial como Benefício
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className={style.pageContainer}>
            <HeaderMain />
            <div className={style.pageMain}>
                {users.map((user, index) => (
                    <div key={index} className={style.userCard} onClick={() => openModal(user)}>
                        <div className={style.profileIcon}>
                            <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>person</span>
                        </div>
                        <div className={style.printIcon}>
                            <h1>{user.name}</h1>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedUser && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <span className={style.closeButton} onClick={closeModal}>×</span>
                        <h2>Detalhes de {selectedUser.name}</h2>
                        
                        {/* Aba de navegação entre Benefício e Tasks */}
                        <div className={style.tabContainer}>
                            <button 
                                className={activeTab === "benefit" ? style.activeTab : ""}
                                onClick={() => setActiveTab("benefit")}
                            >
                                Benefício
                            </button>
                            <button 
                                className={activeTab === "tasks" ? style.activeTab : ""}
                                onClick={() => setActiveTab("tasks")}
                            >
                                Tasks
                            </button>
                        </div>
                        
                        {/* Conteúdo condicional do modal */}
                        {activeTab === "benefit" ? (
                            <div className={style.tabContent}>
                                <p>Informações sobre o benefício para {selectedUser.name}.</p>
                                {/* Conteúdo adicional sobre benefício aqui */}
                            </div>
                        ) : (
                            <div className={style.tabContent}>
                                <p>Lista de tarefas de {selectedUser.name}.</p>
                                {/* Conteúdo adicional sobre tarefas aqui */}
                            </div>
                        )}
                        
                        <button onClick={handleNavigate}>Editar Criança</button>
                    </div>
                </div>
            )}
            
            <FooterMain />
        </div>
    );
};

export default EscolhaFilho;
