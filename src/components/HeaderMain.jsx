import Style from '../styles/HeaderMain.module.css'
import HeaderP from '../assets/TATURANA.png'

const HeaderMain = () => {
  return (
    <div className={Style.headerMain}>
        <img src = {HeaderP} alt="" className={Style.img}/>
        
    </div>
  )
}

export default HeaderMain