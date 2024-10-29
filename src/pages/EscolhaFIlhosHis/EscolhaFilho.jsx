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

    const handleNavigateBenef = () => {
        navigate('/historico-benef');
    };
    const handleNavigateTasks = () => {
        navigate('/historico-task');
    };

    const openModal = (user) => {
        setSelectedUser(user);
        
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
