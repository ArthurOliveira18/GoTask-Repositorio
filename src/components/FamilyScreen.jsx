import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import  style  from "../styles/FamilyScreen.module.css";
import { useState } from 'react';




const FamilyScreen = () => {
  const [users, setUsers] = useState([
    {
      id:1,
      name:"Cristiano"
    },
    {
      id:2,
      name:"Juliana"
    },
    {
      id:3,
      name:"Enzo"
    }
  ])
  
  return (
    <div className={style.pageContainer/*pageContainerFamilyScreen*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainFamilyScreen*/}>
      {users.map((user, index) => (
        <div key={index} className={style.userCard}>
         <div className={style.profileIcon}>
              <span className="material-symbols-outlined" style={{fontSize:"40px"}}>person</span>
            </div>
            <div className={style.printIcon}>
            <h1>{user.name}</h1>
              <span className="material-symbols-outlined" style={{fontSize:"40px"}}>print</span>
            </div>
          </div>
      ))}

        <button className={style.addButton}>
        <span className="material-symbols-outlined" style={{fontSize:"35px"}}>add</span>
        </button>

      </div>
      <FooterMain/>
    </div>
  )
}

export default  FamilyScreen