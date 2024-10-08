import React from 'react'
import style from '../styles/Store.module.css'
import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import ItensStore from './ItensStore'

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