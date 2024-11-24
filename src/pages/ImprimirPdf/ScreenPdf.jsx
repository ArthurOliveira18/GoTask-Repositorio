import style from "./ScreenPdf.module.css";
import FooterMain from "../../components/MainHeadFoot/Footer/FooterMain";
import HeaderMain from "../../components/MainHeadFoot/Header/HeaderMain";
import html2pdf from "html2pdf.js"
import { Link } from 'react-router-dom';
import axios from 'axios';
 // Ajuste conforme o nome do arquivo CSS
 import { useNavigate } from 'react-router-dom';
 import React, { useEffect, useState } from 'react';


const ScreenPdf = () => {

    const baixarpdf = () => {

      const content = document.querySelector("#conteudoPdf");


    const options = {
        margin: [0,0,0,0],
        filename: "arquivo.pdf",
        html2canvas: {scale: 1, y: 140 },
        jsPDF: {unit: "mm", format: "a4", orientation: "landscape"}
    }

    html2pdf().set(options).from(content).save();

    }; 


    const [tasksByDay, setTasksByDay] = useState({ seg: [], ter: [], qua: [], qui: [], sex: [], fds: [] });
   const navigate = useNavigate();
    
   const handleNavigate = (childId) => {
    // Armazena o ID da criança no localStorage
    localStorage.setItem('selectedChildId', childId);
  
    // Verifica se o ID foi armazenado
    console.log("ID da criança armazenado:", localStorage.getItem('selectedChildId'));
  
    // Navega para a página de tarefas
    navigate('/tasks');
  };
    
   // Obtém o ID da criança do localStorage
   const selectedChildId = localStorage.getItem('selectedChildId');
   
   useEffect(() => {
     const fetchTasks = async () => {
       try {
         if (!selectedChildId) {
           console.error('Nenhuma criança selecionada.');
           return;
         }
 
         const response = await axios.get(`/tabela/${selectedChildId}`);
         if (response.data.success) {
           setTasksByDay(response.data.tasksByDay);
         }
       } catch (error) {
         console.error('Erro ao carregar tarefas:', error);
       }
     };
 
     fetchTasks();
   }, [selectedChildId]);


  return (
    <div className={style.pageContainer}>
      <HeaderMain />
      {/* Div preta com a img*/}
      <div className={style.pageMain}>
        <div className={style.arrowMain1}>
          <Link to={'/FamilyScreen'}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div></div>
          <div></div>
        </div>
        <div className={style.divPurple}>
          <h1 className={style.title}>Impressão de tabela</h1>
          <div className={style.imgTable}>
            <img src="./src/assets/tabelaPdf.png" alt="tabela" className={style.tableImg} />
          </div>
              <div id="some">
                          <div id="conteudoPdf" className={style.container}>
                      <div className={style.header}>Tarefas semanais - {}</div>
                
                      <div className={style.days}>
                        {['seg', 'ter', 'qua', 'qui', 'sex'].map((day) => (
                          <div key={day} className={style.day}>
                            <div className={style.dayTitle}>
                              {day === 'seg'
                                ? 'Segunda'
                                : day === 'ter'
                                ? 'Terça'
                                : day === 'qua'
                                ? 'Quarta'
                                : day === 'qui'
                                ? 'Quinta'
                                : 'Sexta'}
                            </div>
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
                
                      <div className={style.totalPoints}>
                        Total de pontos: <input type="text" className={style.pointsInput} disabled />
                      </div>
                    </div>
                </div>
          {/* buttons */}
          <div className={style.buttonContainer}>
            <button onClick={baixarpdf} className={style.printButton}>Baixar PDF</button>
          </div>
        </div>
      </div>
      <FooterMain />
    </div>

  )
}

export default ScreenPdf