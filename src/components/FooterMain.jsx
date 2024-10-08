import React from 'react';
import Style from '../styles/FooterMain.module.css';
import { useLocation } from 'react-router-dom';
import { CalendarToday, ShoppingCart, Home, Settings, FamilyRestroom } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const FooterMain = () => {
  const location = useLocation();
  
  const getIconColor = (path) => {
    return location.pathname === path ? '#735BF2' : 'lightGray';
  };

    return (

  <nav className={Style.divFooterMain}>
  <Settings className="material-symbols-outlined" style={{ color: getIconColor('/settings'), fontSize: "5vh"  }} />
  <CalendarToday className="material-symbols-outlined" style={{ color: getIconColor('/calendar'), fontSize: "5vh"  }} />
  <Link to="/Home"><Home className="material-symbols-outlined" style={{ color: getIconColor('/Home'), fontSize: "5vh" }} /></Link>
  <Link to="/Teste"><ShoppingCart className="material-symbols-outlined" style={{ color: getIconColor('/Teste'), fontSize: "5vh"  }} /></Link>
  <FamilyRestroom className="material-symbols-outlined" style={{ color: getIconColor('/family'), fontSize: "5vh"  }} />
</nav>
);
}

export default FooterMain;

