import React from 'react'
import style from '../styles/Test.module.css'
import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import ItensStore from './ItensStore'

const Config = () => {
  return (
    <div className={style.pageContainerTest/*pageContainerConfig*/}>
        <HeaderMain/>
      <div className={style.pageMainTest/*pageMainConfig*/}>
       
      </div>
      <FooterMain/>
    </div>
  )
}

export default Config