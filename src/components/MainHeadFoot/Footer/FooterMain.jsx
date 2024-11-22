import Style from '../Footer/FooterMain.module.css';
import { CalendarToday, EmojiEvents, Home,  FamilyRestroom, History } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const FooterMain = () => {
  const getIconColor = (paths) => {
    return paths.some(path => location.pathname.startsWith(path)) ? '#735BF2' : 'lightGray';
  };
  
  return (
    <nav className={Style.divFooterMain}>
      <Link to="/escolha-filho">
        <History
          className="material-symbols-outlined"
          style={{
            color: getIconColor(['/escolha-filho', '/historico-task', '/historico-benef']),
            fontSize: "40px"
          }}
        />
      </Link>
  
      <Link to="/TaskScreen">
        <CalendarToday
          className="material-symbols-outlined"
          style={{
            color: getIconColor(['/TaskScreen', '/create-task', '/edit-list-task', '/edit-task-real', '/excluirTask']),
            fontSize: "40px"
          }}
        />
      </Link>
  
      <Link to="/Home">
        <Home
          className="material-symbols-outlined"
          style={{
            color: getIconColor(['/Home', '/Config']),
            fontSize: "40px"
          }}
        />
      </Link>
  
      <Link to="/Store">
        <EmojiEvents
          className="material-symbols-outlined"
          style={{
            color: getIconColor(['/Store', '/cad-beneficio', '/edit-recompensa']),
            fontSize: "40px"
          }}
        />
      </Link>
  
      <Link to="/FamilyScreen">
        <FamilyRestroom
          className="material-symbols-outlined"
          style={{
            color: getIconColor([
              '/FamilyScreen',
              '/editar-crianca',
              '/ScreenPdf',
              '/register-children',
              '/passagem-tela',
              '/select-days'
            ]),
            fontSize: "40px"
          }}
        />
      </Link>
    </nav>
  );
  
}
export default FooterMain;



