import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import style from '../styles/Config.module.css';


const TaskScreen = () => {
  return (
    <div className={style.pageContainer/*pageContainerTaskScreen*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainTaskScreen*/}>
        <h1>a</h1>
      </div>
      <FooterMain/>
    </div>
  )
}

export default  TaskScreen