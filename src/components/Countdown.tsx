import styles from '../styles/components/Countdown.module.css';
import {CountdownContext} from '../contexts/CountdownContext';
import { useContext } from 'react';
let countdownTmeout: NodeJS.Timeout;

export  function Countdown(){
    const{   
        minutes,
        seconds,
        hasFisnished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);
   

    const [minuteLeft, minuteRigth] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRigth] = String(seconds).padStart(2,'0').split('');
    
   

    return(
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRigth}</span>
            </div>
                 <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRigth}</span>
            </div>
        </div>

        {hasFisnished ? (
             <button 
             disabled
             type="button"
             className={styles.countdownButton}
             >
              Ciclo Encerrado
            </button>
     
        ) : (
            <>
              { isActive ? (
        <button 
        type="button"
        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        onClick={resetCountdown}
        >
           Abandonar um Ciclo
       </button>

        ) : ( 

            <button 
            type="button"
            className={styles.countdownButton}
            onClick={startCountdown}
            >
               Iniciar um Ciclo
           </button>

        ) }
            </>
        )}

      

       

        </div>
    );
}