import React from 'react'
import style from '../styles/Test.module.css'
import HeaderMain from './HeaderMain'
import FooterMain from './FooterMain'
import ItensStore from './ItensStore'

const TaskScreen = () => {
  return (
    <div className={style.pageContainerTest/*pageContainerTaskScreen*/}>
        <HeaderMain/>
      <div className={style.pageMainTest/*pageMainTaskScreen*/}>
        
      </div>
      <FooterMain/>
    </div>
  )
}

export default  TaskScreen