import Style from '../Footer/FooterMain.module.css';
import { useLocation } from 'react-router-dom';
import { CalendarToday, ShoppingCart, Home,  FamilyRestroom, History } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const FooterMain = () => {
  const location = useLocation();
  
  const getIconColor = (path) => {
    return path.includes(location.pathname) ? '#735BF2' : 'lightGray';
  };

    return (

  <nav className={Style.divFooterMain}>

  <Link to="/escolha-filho">  <History className="material-symbols-outlined" style={{ color: getIconColor(['/escolha-filho', '/historico-task', '/historico-benef']), fontSize: "40px"  }} />  </Link>

  <Link to="/TaskScreen">  <CalendarToday className="material-symbols-outlined" style={{ color: getIconColor(['/TaskScreen', '/create-task', '/edit-list-task']), fontSize: "40px"  }} />  </Link>


  <Link to="/Home">  <Home className="material-symbols-outlined" style={{ color: getIconColor(['/Home', '/Config']), fontSize: "40px" }} />  </Link>


  <Link to="/Store">  <ShoppingCart className="material-symbols-outlined" style={{ color: getIconColor(['/Store', '/cad-beneficio']), fontSize: "40px"  }} />  </Link>


  <Link to="/FamilyScreen">  <FamilyRestroom className="material-symbols-outlined" style={{ color: getIconColor(['/FamilyScreen', '/editar-crianca', '/ScreenPdf', '/register-children']), fontSize: "40px"  }} />  </Link>
{/* Coment para upar pro git */}

</nav>
);
}
export default FooterMain;



