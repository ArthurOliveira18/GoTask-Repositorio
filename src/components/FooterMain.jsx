import React from 'react';
import Style from '../styles/FooterMain.module.css';

const FooterMain = () => {
  return (
    <div className={Style.divFooterMain}>
      <span className="material-symbols-outlined">
        calendar_today
      </span>

      <span className="material-symbols-outlined">
        shopping_cart
      </span>

      <span className="material-symbols-outlined">
        home
      </span>

      <span className="material-symbols-outlined">
        settings
      </span>

      <span className="material-symbols-outlined">
        family_restroom
      </span>
    </div>
  );
}

export default FooterMain;
