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
      name: 'Dormir duas horas mais tarde',
      points: 30

    },
    {
      id: 3,
      name: 'Dormir duas horas mais tarde',
      points: 30

    },
    {
      id: 4,
      name: 'Dormir duas horas mais tarde',
      points: 30

    },
    {
      id: 5,
      name: 'Dormir duas horas mais tarde',
      points: 30

    },
    {
      id: 6,
      name: 'Dormir duas horas mais tarde',
      points: 30

    },
    
  ])

  return (
    <div className={style.itensBlue}>
      {recompensas.map((recomp) =>(
        <div key={recomp.id} style={{color:"#000" , width:"30%",height:'20%',backgroundColor: "#fff" }}>
          <p>a</p>
        </div>
      ))}
    </div>
  )
}

export default ItensStore