import Style from '../Header/HeaderMain.module.css'
import HeaderP from '../../../assets/TATURANA.png'
import GoTask from '../../../assets/logoGT.png'

const HeaderMain = () => {
  return (
    <div className={Style.headerMain}>
        <img src = {HeaderP} alt="" className={Style.imgPurple}/>
        <img src={GoTask} alt=""  className={Style.imgGoTask}/>

    </div>
  )
}

export default HeaderMain