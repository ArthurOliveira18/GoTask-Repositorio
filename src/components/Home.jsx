import React from 'react';
import Style from '../styles/Home.module.css';
import FooterMain from './FooterMain';
import HeaderMain from './HeaderMain';

const Home = () => {
  return (
    <div className={Style.pageContainer}> {/* Classe para garantir layout flex */}
      <HeaderMain/>

      
      <div className={Style.homeMain}>

        {/* Essas divs que estão com nomes de cor são apenas para eu conseguir colocar uma cor de fundo nelas como está no protótipo */}
        <div className={Style.homeBlue}>
          
          <div className={Style.homePurple}>

            {/* Essa div aqui são com as informações dos filhos, por isso o nome de "homeChildren" */}
            <div className={Style.homeChildren}>
              <div className={Style.nameChildren}>
                <h2>Cristhiano</h2>
                
                <p>total de pontos: 50</p>
              </div>
              
              <hr />
             
            </div>
          </div>
        </div>

      </div>

      <FooterMain/>
    </div>
  );
}

export default Home;
