import React from 'react'
import style from "../styles/Config.module.css";

import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import ItensStore from './ItensStore'

const FamilyScreen = () => {
  return (
    <div className={style.pageContainer/*pageContainerFamilyScreen*/}>
        <HeaderMain/>
      <div className={style.pageMain/*pageMainFamilyScreen*/}>
      <p>a</p>
        
      </div>
      <FooterMain/>
    </div>
  )
}

export default  FamilyScreen