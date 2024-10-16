import style from './Store.module.css'
import HeaderMain from '../../components/MainHeadFoot/Header/HeaderMain'
import FooterMain from '../../components/MainHeadFoot/Footer/FooterMain'
import ItensStore from './ItensLoja/ItensStore'

const Store = () => {
  return (
    <div className={style.pageContainerStore}>
        <HeaderMain/>
      <div className={style.pageMainStore}>
        <ItensStore/>
      </div>
      <FooterMain/>
    </div>
  )
}

export default Store