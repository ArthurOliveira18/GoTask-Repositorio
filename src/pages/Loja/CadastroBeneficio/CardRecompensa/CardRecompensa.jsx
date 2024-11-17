import style from './CardRecompensa.module.css';
import { useState } from 'react';
import axios from 'axios';
const url = "http://localhost:3000/beneficios"
import { useNavigate } from 'react-router-dom';

const CardRecompensa = () => {

    const navigate = useNavigate()
    

    const [beneficio, setBeneficio] = useState('');
    const [pontos, setPontos] = useState('');

    // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
    const user = JSON.parse(localStorage.getItem('user'));

    // Acessa o idResp dentro do objeto 'user'
    const idResp = user ? user.idResp : null;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        try {
            
            const response = await axios.post(url, {
                Nome_ben: beneficio,
                pontos_ben: pontos,
                idResp: idResp,
            });

            // Verifica se a resposta indica sucesso e redireciona
            if (response.status === 200 || response.status === 201) {
                alert(response.data.message); // Mensagem de sucesso
                navigate('/Store'); // Redireciona para a página Store
            } else {
                alert('Erro ao criar benefício. Tente novamente.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao criar benefício. Verifique os dados e tente novamente.');
        }
    };


    return (
        <div>
            <form className={style.formRecompensa} onSubmit={handleSubmit}>
                <div className={style.divCardRecompensa}>
                    <div className={style.divInputsRecompensas}>
                        <h2>Benefício</h2>
                        <input
                            type="text"
                            value={beneficio}
                            onChange={(e) => setBeneficio(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.divInputsRecompensas}>
                        <h2>Pontos para resgatar</h2>
                        <input
                            type="number"
                            value={pontos}
                            onChange={(e) => setPontos(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={style.divButtonRecompensa}>
                    <button type="submit">Criar benefício</button>
                </div>
            </form>
        </div>
    );
};

export default CardRecompensa;
