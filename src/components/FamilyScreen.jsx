import React from 'react'
import style from '../styles/Test.module.css'
import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import ItensStore from './ItensStore'

const FamilyScreen = () => {
  return (
    <div className={style.pageContainerTest/*pageContainerFamilyScreen*/}>
        <HeaderMain/>
      <div className={style.pageMainTest/*pageMainFamilyScreen*/}>
      <p>a</p>
        
      </div>
      <FooterMain/>
    </div>
  )
}

export default  FamilyScreen