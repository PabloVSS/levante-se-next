import Head from 'next/head';
import styles from "../styles/pages/Home.module.css";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import  { ExperienceBar }  from "../components/ExperienceBar";
import  { Profile }  from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";


import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface Homeprops {
level: number;
currentExperience: number;
challengeCompleted: number;

}

export default function Home(props: Homeprops) {

  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengeCompleted={props.challengeCompleted}
    >

    <div className={styles.container}> 
    <Head>
      <title>Início/Levante-se</title>
    </Head>
    
    <ExperienceBar />

      <CountdownProvider>
    <section>
      <div>
        <Profile />
        <CompletedChallenges />
        <Countdown />
      </div>
      <div>
        <ChallengeBox />
      </div>
    </section>
    </CountdownProvider>
  </div>
  </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted} = ctx.req.cookies;

  return {
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}