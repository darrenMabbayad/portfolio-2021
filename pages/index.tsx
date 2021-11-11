import { faFigma, faReact } from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import Divider from "../components/common/Divider";
import { TypingGame } from "../components/typing-game/TypingGame";
import Layout from "../layouts/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [timer, setTimer] = useState<number>(15);
  const [timerSetting, setTimerSetting] = useState<number>(15);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [showTypingGameResults, setShowTypingGameResults] =
    useState<boolean>(false);

  function resetTimer() {
    setTimer(timerSetting);
    setIsTimerActive(true);
    setShowTypingGameResults(false);
  }

  function resetGame() {
    setTimer(timerSetting);
    setShowTypingGameResults(false);
  }

  function changeTimer(time: number) {
    setTimerSetting(time);
    setTimer(time);

    localStorage.setItem("dmportfolio-typing-game-timer", JSON.stringify(time));
  }

  useEffect(() => {
    const savedTimer = localStorage.getItem("dmportfolio-typing-game-timer");
    if (savedTimer) {
      setTimer(JSON.parse(savedTimer));
      setTimerSetting(JSON.parse(savedTimer));
    }
  }, []);

  useEffect(() => {
    let interval = null as any;
    if (timer === 0) {
      setShowTypingGameResults(true);
      setIsTimerActive(false);
      clearInterval(interval);
    }

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  return (
    <Layout>
      <section className={styles.intro}>
        <h1 className={styles.introHeader}>Hey, my name is Darren!</h1>
        <img className={styles.introImage} src="/me.jpg" alt="me" />
        <p className={styles.introDescription}>
          I'm a self taught developer with a background in Electrical/Computer
          Engineering. I started learning about web development in January 2020,
          just for fun. Getting to know the fundamentals, choosing a tech stack,
          building silly apps - then just <strong>10 months</strong> after
          starting, I found myself in a Frontend Developer role instead of a
          Technician role.
        </p>
        <p className={styles.introDescription}>
          Funny how things can turn out, eh?
        </p>
      </section>
      <section className={styles.typingGameSection}>
        <div
          className={
            showTypingGameResults
              ? `${styles.typingGameInfo} ${styles.showResults}`
              : `${styles.typingGameInfo}`
          }
        >
          <h3>Try this real quick!</h3>
          <button
            className={
              timerSetting === 15
                ? `${styles.timerOption} ${styles.timerOptionActive}`
                : `${styles.timerOption}`
            }
            disabled={isTimerActive}
            onClick={() => {
              changeTimer(15);
            }}
          >
            15
          </button>
          <button
            className={
              timerSetting === 30
                ? `${styles.timerOption} ${styles.timerOptionActive}`
                : `${styles.timerOption}`
            }
            disabled={isTimerActive}
            onClick={() => {
              changeTimer(30);
            }}
          >
            30
          </button>
          <button
            className={
              timerSetting === 60
                ? `${styles.timerOption} ${styles.timerOptionActive}`
                : `${styles.timerOption}`
            }
            disabled={isTimerActive}
            onClick={() => {
              changeTimer(60);
            }}
          >
            60
          </button>
          <button
            className={
              timerSetting === 120
                ? `${styles.timerOption} ${styles.timerOptionActive}`
                : `${styles.timerOption}`
            }
            disabled={isTimerActive}
            onClick={() => {
              changeTimer(120);
            }}
          >
            120
          </button>
        </div>
        <div className={styles.typingGame}>
          <p
            className={
              showTypingGameResults
                ? `${styles.timer} ${styles.showResults}`
                : `${styles.timer}`
            }
          >
            {timer}
          </p>
          <TypingGame
            startTimer={setIsTimerActive}
            resetTimer={resetTimer}
            resetGame={resetGame}
            isTimerActive={isTimerActive}
            showResults={showTypingGameResults}
            timerSetting={timerSetting}
          />
        </div>
      </section>
      <Divider />
      <section className={styles.skillSection}>
        <h1 className={styles.skillSectionHeader}>What I do</h1>
        <div className={styles.skillList}>
          <div className={styles.skill}>
            <FontAwesomeIcon icon={faReact} />
            <p>React</p>
          </div>
          <div className={styles.skill}>
            <FontAwesomeIcon icon={faDatabase} />
            <p>MongoDB</p>
          </div>
          <div className={styles.skill}>
            <FontAwesomeIcon icon={faFigma} />
            <p>UI/UX</p>
          </div>
        </div>
        <p className={styles.skillSectionDescription}>
          I build applications with React and expand to different frameworks and
          toolsets depending on the project. So far, Next.js has been my
          favorite React framework for development and I know how to use
          AdobeXD/Figma for component prototyping prior to development.
        </p>
        <p className={styles.skillSectionDescription}>
          I also have experience with NoSQL development with MongoDB and, though
          I prefer to do all the CSS myself, I am more than open to using CSS
          frameworks like Material UI and TailwindCSS.
        </p>
      </section>
      <Divider />
      <section id="projects"></section>
    </Layout>
  );
};

export default Home;