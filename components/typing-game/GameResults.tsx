import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import styles from "../../styles/components/typing-game/TypingGame.module.css";

interface Props {
  timerSetting: number;
  characters: {
    correct: number;
    incorrect: number;
    extra: number;
    total: number;
  };
  resetGame: () => void;
}

const GameResults: FunctionComponent<Props> = ({
  timerSetting,
  characters,
  resetGame,
}) => {
  const { correct, incorrect, extra, total } = characters;
  const grossWpm = Math.floor(total / 5 / (timerSetting / 60));
  const netWpm = Math.floor(grossWpm - incorrect / (timerSetting / 60));
  const accuracy = ((correct / total) * 100).toFixed(2);

  return (
    <div>
      <div className={styles.resultsInfoContainer}>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>gross WPM</h4>
          <p className={styles.resultsInfoText}>{grossWpm}</p>
        </div>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>net WPM</h4>
          <p className={styles.resultsInfoText}>{netWpm}</p>
        </div>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>accuracy</h4>
          <p className={styles.resultsInfoText}>{accuracy}%</p>
        </div>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>characters</h4>
          <p
            className={styles.resultsInfoText}
          >{`${correct}/${incorrect}/${extra}/${total}`}</p>
        </div>
      </div>
      <button
        className={`${styles.gameButton} ${styles.gameButtonSmall} ${styles.resultsButton}`}
        onClick={() => resetGame()}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
    </div>
  );
};

export default GameResults;
