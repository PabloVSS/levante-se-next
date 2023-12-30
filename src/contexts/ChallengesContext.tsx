import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json';
import { LevelUpModel } from '../components/LevelUpModel';


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    level: number
    currentExperience: number; 
    challengeCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    CompletedChallenges: () => void;
    startNewCharllenge: () => void;
    resetChallenge: () => void;
    closeLevelUpModel: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;

}

export const ChallengesContext = createContext ({} as ChallengesContextData);


export function ChallengesProvider({
children,
...rest
} : ChallengesProviderProps) {
   
const [level, setLevel] = useState(rest.level ?? 1);
const[currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 0);
const[challengeCompleted, setchallengeCompleted] = useState(rest.challengeCompleted ?? 0);

const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

const experienceToNextLevel = Math.pow(((level + 1) * 4), 2)

useEffect(() => {
    Notification.requestPermission();
}, [])

useEffect(() => {
    Cookies.set('level',String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));
}, [level, currentExperience, challengeCompleted]);


function startNewCharllenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as Challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
        new Notification('Novo Desafio',{
            body: `Valendo ${challenge.amount} de xp!`
        })
    }
}

function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
}

function closeLevelUpModel(){
    setIsLevelUpModalOpen(false);
}


function CompletedChallenges(){
    if (!activeChallenge){
        return;
    }

    const{ amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
        finalExperience =  finalExperience - experienceToNextLevel;
        levelUp();
        
    }

    setcurrentExperience(finalExperience);
    setActiveChallenge(null);
    setchallengeCompleted(challengeCompleted + 1);

}
function resetChallenge(){
    setActiveChallenge(null)
}
   
    return (
        <ChallengesContext.Provider 
        value={{
        level, 
        experienceToNextLevel,
        levelUp, 
        currentExperience, 
        challengeCompleted,
        startNewCharllenge,
        activeChallenge,
        resetChallenge,
        CompletedChallenges,
        closeLevelUpModel
        }}>

            {children}

       { isLevelUpModalOpen && <LevelUpModel /> }
        </ChallengesContext.Provider>
        )
}