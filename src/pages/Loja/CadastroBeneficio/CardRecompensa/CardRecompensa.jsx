import style from './CardRecompensa.module.css';

const CardRecompensa = () => {
  return (
    <div>

        <form className={style.formRecompensa}>
            {/* Essa div é a parte roxa que contem os inputs dentro dela. */}
            <div className={style.divCardRecompensa}>
                <div className={style.divInputsRecompensas}>
                    <h2>Beneficio</h2>
                    <input type="text" />
                </div>

                <div className={style.divInputsRecompensas}>
                    <h2>Pontos para redivincar</h2>
                    <input type="number"  />
                </div>

            </div>

            <div className={style.divButtonRecompensa}>
                <button type='submit'>Criar beneficio</button>
            </div>
        </form>

    </div>
  )
}

export default CardRecompensa