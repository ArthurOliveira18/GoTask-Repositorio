import Style from '../Footer/FooterMain.module.css';
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

  <Link to="/Config">  <Settings className="material-symbols-outlined" style={{ color: getIconColor('/Config'), fontSize: "5vh"  }} />  </Link>

  <Link to="/TaskScreen">  <CalendarToday className="material-symbols-outlined" style={{ color: getIconColor('/TaskScreen'), fontSize: "5vh"  }} />  </Link>


  <Link to="/Home">  <Home className="material-symbols-outlined" style={{ color: getIconColor('/Home'), fontSize: "5vh" }} />  </Link>


  <Link to="/Store">  <ShoppingCart className="material-symbols-outlined" style={{ color: getIconColor('/Store'), fontSize: "5vh"  }} />  </Link>


  <Link to="/FamilyScreen">  <FamilyRestroom className="material-symbols-outlined" style={{ color: getIconColor('/FamilyScreen'), fontSize: "5vh"  }} />  </Link>


</nav>
);
}

export default FooterMain;




