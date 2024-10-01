import React from 'react'
import Style from '../styles/FooterMain.module.css'
import imgFooterMain from '../assets/Mamamia.png'

const FooterMain = () => {
  return (
    <div>
        <div className={Style.divFooterMain}>
            <img src={imgFooterMain} alt="" className={Style.imgMainFooter} />

            <span class="material-symbols-outlined">
                calendar_today
            </span>
        </div>
    </div>
  )
}

export default FooterMain