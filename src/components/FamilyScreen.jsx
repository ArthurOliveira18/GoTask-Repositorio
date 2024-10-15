import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import  style  from "../styles/FamilyScreen.module.css";


const users = ['Cristiano', 'Julia', 'Enzo']



const FamilyScreen = () => {
  return (
    <div className={style.pageContainer/*pageContainerFamilyScreen*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainFamilyScreen*/}>
      {users.map((user, index) => (
        <div key={index} className={style.userCard}>
         <div className={style.profileIcon}>
              <span className="material-symbols-outlined">person</span>
            </div>
           
            <div className={style.printIcon}>
            <span className={style.userName}>{user}</span>
              <span className="material-symbols-outlined">print</span>
            </div>
          </div>
      ))}

        <button className={style.addButton}>
        <span className="material-symbols-outlined">add</span>
        </button>

      </div>
      <FooterMain/>
    </div>
  )
}

export default  FamilyScreen