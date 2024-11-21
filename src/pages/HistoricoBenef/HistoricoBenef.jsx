import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain';
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain';
import style from './HistoricoBenef.module.css';
import { Link, useParams } from 'react-router-dom'; // Importando useParams para obter o id da criança
import { useState, useEffect } from 'react';
import axios from 'axios';

const HistoricoBenef = () => {
  const { idCrianca } = useParams(); // Obtendo o id da criança pela URL
  const [recompensas, setRecompensas] = useState([]); // Lista de benefícios resgatados
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Função para buscar os benefícios resgatados da criança específica
  const fetchRecompensas = async () => {
    try {
        // Recupera o ID da criança de localStorage
        const idCrianca = localStorage.getItem('selectedChildId');
        
        // Verifica se o ID da criança existe
        if (!idCrianca) {
            throw new Error('ID da criança não encontrado no localStorage!');
        }

        console.log('ID da criança recuperado do localStorage:', idCrianca);
        
        // Envia o ID da criança na URL da requisição
        const response = await axios.get(
            `http://localhost:3000/historicoBeneficio?idCrianca=${idCrianca}`
        );
        
        console.log('Benefícios resgatados:', response.data);
        setRecompensas(response.data); // Dados já filtrados e formatados
    } catch (error) {
        console.error('Erro ao buscar os benefícios:', error);
        setError('Erro ao carregar o histórico de benefícios.');
    } finally {
        setLoading(false);
    }
};



  // useEffect para carregar os dados ao montar o componente
  useEffect(() => {
    fetchRecompensas();
  }, [idCrianca]); // Recarregar sempre que o idCrianca mudar

  // Função para formatar a data no UTC-3
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Ajuste para UTC-3
    const utcMinus3 = new Date(date.getTime() - 3 * 60 * 60 * 1000);

    // Formatação: dd/MM/yyyy HH:mm
    const day = String(utcMinus3.getDate()).padStart(2, '0');
    const month = String(utcMinus3.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = utcMinus3.getFullYear();
    const hours = String(utcMinus3.getHours()).padStart(2, '0');
    const minutes = String(utcMinus3.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };


  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      <div className={style.pageMain}>
        {/* Título ou link para retornar */}
        <div className={style.arrowMain1}>
          <Link to={'/escolha-filho'}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </Link>
          <div></div>

          <div></div>
        </div>

        {/* Conteúdo principal */}
        <div className={style.itensBenef}>
          {loading ? (
            <p>Carregando histórico de benefícios...</p>
          ) : error ? (
            <p>{error}</p>
          ) : recompensas.length > 0 ? (
            recompensas.map((recomp) => {

              return (
                <div
                  key={recomp.idHistoricoBeneficio}
                  className={`${style.divBenefs}`}
                >
                  <p><strong>Benefício:</strong> {recomp.Beneficio}</p>
                  <p><strong>Pontos:</strong> -{recomp.valor}</p>
                  <p><strong>Data de Resgate:</strong> {`${formatDateTime(recomp.dataBeneficio)}`}</p>
                </div>
              );
            })
          ) : (
            <p>Nenhum benefício resgatado.</p>
          )}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default HistoricoBenef;
