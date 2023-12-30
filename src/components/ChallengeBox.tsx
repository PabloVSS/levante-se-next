import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const {activeChallenge, CompletedChallenges} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);
    
    function handleChallengeSucced( ){
        CompletedChallenges();
        resetCountdown();

    }

    function handleChallengeFailed(){
        CompletedChallenges();
        resetCountdown();
    }



    const hasActiveChallenge = true;

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? ( 
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>

            <main>
            <img src={`icons/${activeChallenge.type}.svg`} /> 
                <strong>Novo desafio</strong>
                <p>{activeChallenge.description}</p>
            </main>
            
            <footer>
                <button 
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
                >
                    Falhei
                </button>

                <button 
                type="button"
                className={styles.challengeSucessButton}
                onClick={handleChallengeSucced}
                >
                    Completei
                </button>
            </footer>
        </div>

        ) : ( <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
                <img src='icons/level-up.svg' alt="Level Up" />
                    Avance de level completando desafios
      
            </p>
        </div>
           ) } 

</div>
    )
}