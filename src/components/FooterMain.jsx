import React from 'react';
import Style from '../styles/FooterMain.module.css';
import { useLocation } from 'react-router-dom';
import { CalendarToday, ShoppingCart, Home, Settings, FamilyRestroom } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const FooterMain = () => {
  const location = useLocation();
  
  const getIconColor = (path) => {
    return location.pathname === path ? 'purple' : 'lightGray';
  };


    return (

  <nav className={Style.divFooterMain}>
  <Link to="/Home"><Home className="material-symbols-outlined" style={{ color: getIconColor('/Home') }} /></Link>
  <Link to="/Teste"><ShoppingCart className="material-symbols-outlined" style={{ color: getIconColor('/Teste') }} /></Link>
  <Settings className="material-symbols-outlined" style={{ color: getIconColor('/settings') }} />
  <CalendarToday className="material-symbols-outlined" style={{ color: getIconColor('/calendar') }} />
  <FamilyRestroom className="material-symbols-outlined" style={{ color: getIconColor('/family') }} />
</nav>
);
}

export default FooterMain;





 //     <nav className={Style.divFooterMain}>
  //       <calendar_today className="material-symbols-outlined" >
  //         calendar_today
  //       </calendar_today>

  //       <shopping_cart className="material-symbols-outlined" >
  //         shopping_cart
  //       </shopping_cart>

  //       <home className="material-symbols-outlined">
  //         home
  //       </home>

  //       <settings className="material-symbols-outlined">
  //         settings
  //       </settings>

  //       <family_restroom className="material-symbols-outlined">
  //         family_restroom
  //       </family_restroom>
  //     </nav>
  // );