import React, { useState } from 'react'
import style from '../styles/ItensStore.module.css'

const ItensStore = () => {

  const [recompensas, setRecompensas] = useState([
    {
      id: 1,
      name: 'Dormir duas horas mais tarde',
      points: 30

    },

    {
      id: 2,
      name: 'Sair com os amigos',
      points: 70

    },
    {
      id: 3,
      name: 'Brincar mais tempo com os amigos',
      points: 10

    },
    {
      id: 4,
      name: 'Jogar por mais de uma hora',
      points: 20

    },
    {
      id: 5,
      name: 'Ir ao cinema',
      points: 90

    },
    {
      id: 6,
      name: 'Vê desenho até mais tarde',
      points: 25

    },
    
  ])

  return (
    <div className={style.itensBlue}>
      {recompensas.map((recomp) =>(
        <div key={recomp.id} style={{color:"#000" , 
        width:"40%",
        height:'20%',
        backgroundColor: "#fff",
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        flexDirection:'column',
        alignItems:'center',
        border: '5px solid #000',
        borderBottom:'10px solid #000',
        borderRadius:'1rem'

        
        }}>
          <p>{recomp.name}</p>
          <br />
          <p>Pontos:</p>
          <h2>{recomp.points} P</h2>
        </div>
        
      ))}
    </div>
  )
}

export default ItensStore