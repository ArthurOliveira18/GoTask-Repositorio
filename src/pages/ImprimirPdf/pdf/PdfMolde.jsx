import React, { useEffect, useState } from 'react';
import style from "./PdfMolde.module.css";
import axios from 'axios';
 // Ajuste conforme o nome do arquivo CSS
 import { useNavigate } from 'react-router-dom';

 const WeeklyTasks = () => {
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
     <div id="conteudoPdf" className={style.container}>
       <div className={style.header}>Tarefas semanais - {selectedChildId}</div>
 
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
   );
 };
 
 export default WeeklyTasks;
