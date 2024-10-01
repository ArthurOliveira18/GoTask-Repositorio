import Style from '../styles/Home.module.css'
import FooterMain from './FooterMain'
import HeaderMain from './HeaderMain'


const Home = () => {
  return (
    <div>
        <HeaderMain/>

        <div className={Style.mainHome}>
            a
        </div>

        <FooterMain/>
    </div>
  )
}

export default Home