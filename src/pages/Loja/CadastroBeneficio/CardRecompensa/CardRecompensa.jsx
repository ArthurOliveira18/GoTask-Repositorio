import style from './CardRecompensa.module.css';
import { useState } from 'react';
import axios from 'axios';
const url = "http://localhost:3000/beneficios"

const CardRecompensa = () => {
    const [beneficio, setBeneficio] = useState('');
    const [pontos, setPontos] = useState('');

    // Obtém o objeto 'user' do localStorage e faz o parse para um objeto JavaScript
    const user = JSON.parse(localStorage.getItem('user'));

    // Acessa o idResp dentro do objeto 'user'
    const idResp = user ? user.idResp : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responsavelId = 1; // Substitua pelo ID do responsável logado.
            const response = await axios.post(url, {
                Nome_ben: beneficio,
                pontos_ben: pontos,
                idResp: idResp,
            });
            alert(response.data.message);
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
