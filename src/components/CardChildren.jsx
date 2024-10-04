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
      totalPoints: 100
    },

    {
      id:3,
      name: "Enzo",
      task:[
        {taskName: "Arrumar a casa" , points: 80, complete:false},
        {taskName: "Ir passear com o cachorro" , points: 30, complete:false}
      ],
      totalPoints: 100
    }
  ])

  return (
    <div className={style.homeMain}>
      <div className={style.homePurple}>
        <div className={style.homeChildren}>
          <div className={style.nameChildren}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardChildren;
 