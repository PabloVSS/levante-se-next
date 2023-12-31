import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
    children: ReactNode;
}

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFisnished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}
let countdownTimeout: NodeJS.Timeout;


export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps){
    const { startNewCharllenge } = useContext(ChallengesContext);

    const[time, setTime] = useState(0.05 * 60);
    const[isActive, setIsActive] = useState(false);
    const[hasFisnished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;
   
    function startCountdown(){

        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.05 * 60);
    }

    useEffect(() => {
       if(isActive && time > 0){
        countdownTimeout = setTimeout(() => {
               setTime(time - 1);
           }, 1000)
       } else if (isActive && time === 0){
        setHasFinished(true);
        setIsActive(false);
        startNewCharllenge();
       }
    }, [isActive, time])
   
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFisnished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}