import Style from '../styles/HeaderMain.module.css'
import HeaderP from '../assets/TATURANA.png'

const HeaderMain = () => {
  return (
    <div className={Style.headerMain}>
        <img src = {HeaderP} alt="" className={Style.img}/>
        <h1>a</h1>
    </div>
  )
}

export default HeaderMain