import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import styles from "@styles/components/typing-game/TypingGame.module.scss";

interface Props {
  timerSetting: number;
  characters: {
    correct: number;
    incorrect: number;
    extra: number;
    total: number;
  };
  resetGame: () => void;
  chartData: Array<Score>;
}

interface Score {
  correct: number;
  incorrect: number;
  extra: number;
  total: number;
}

const GameResults: FunctionComponent<Props> = ({
  timerSetting,
  characters,
  resetGame,
  chartData,
}) => {
  const { correct, incorrect, extra, total } = characters;
  const grossWpm = Math.floor(total / 5 / (timerSetting / 60));
  const netWpm = Math.floor(grossWpm - incorrect / (timerSetting / 60));
  const accuracy = Math.floor((correct / total) * 100);

  return (
    <div>
      <div className={styles.resultsInfoContainer}>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>wpm</h4>
          <p className={styles.resultsInfoText}>{netWpm}</p>
        </div>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>accuracy</h4>
          <p className={styles.resultsInfoText}>
            {accuracy ? `${accuracy}%` : `n/a`}
          </p>
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
        <FontAwesomeIcon className={styles.gameButtonIcon} icon={faUndo} />
      </button>
    </div>
  );
};

export default GameResults;
