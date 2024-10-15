import React from 'react'
import style from "../styles/Config.module.css";
import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import ItensStore from './ItensStore'

const Config = () => {
  return (
    <div className={style.pageContainer/*pageContainerConfig*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainConfig*/}>
       <p>Teste</p>
      </div>
      <FooterMain/>
    </div>
  )
}

export default Config