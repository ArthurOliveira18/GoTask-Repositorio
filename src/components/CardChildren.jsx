import React, { useState } from "react";
import style from '../styles/CardChildren.module.css';

const CardChildren = () => {

  

  const[children, setChildren] =useState([
    {
      id:1,
      name: "Cristiano",
      task:[
        {taskName: "Arrumar a cama" , points: 10, complete:false},
        {taskName: "Tirar o lixo de casa" , points: 30, complete:false}
      ],
      totalPoints: 100
    },

    {
      id:2,
      name: "Julia",
      task:[
        {taskName: "Fazer dever de matematica" , points: 40, complete:false},
        {taskName: "Dormir mais cedo" , points: 10, complete:false}
      ],
      totalPoints: 50
    },

    {
      id:3,
      name: "Enzo",
      task:[
        {taskName: "Arrumar a casa" , points: 80, complete:false},
        {taskName: "Ir passear com o cachorro" , points: 30, complete:false}
      ],
      totalPoints: 70
    }
  ])


  return (
    // Criei esta div apenas para colocar uma cor de fundo roxa bem claro e deixar as divs roxa com a div branca dentro
    <div className={style.homeMain}>
      {/* div criada para estilizar a parte roxa que dentro dela tem a div branca  */}
      <div className={style.homePurple}>
        {children.map((filho, index) => (
          // Div criada de maneira dinamica e estilizando todas as informações dos filhos, fazendo assim criar uma div para cada filho.
          <div key={filho.id} style={{
          backgroundColor:'#FFFFFF' , 
          width:'90%', 
          height:'30%',
          display:'flex', 
          justifyContent:"center" , 
          flexDirection:'column', 
          gap:'1rem', 
          alignItems:"center", 
          textAlign:"end",
          borderRadius:'1rem'
          }}>

            <div className={style.nameChildren}>
              <h1>{filho.name}</h1>
              <p>Total de pontos: {filho.totalPoints}</p>
            </div>
            <div className={style.taskChildren}>
              {filho.task.map((tarefas, index)=(
                <form key={index}>
                  <input 
                  type="checkbox" 
                  checked
                  />
                </form>
              ))}
                
            </div>
               
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardChildren;
 