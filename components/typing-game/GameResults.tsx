import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import styles from "@styles/components/typing-game/TypingGame.module.scss";
import Tooltip from "@components/common/Tooltip";

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

interface ScoreToolTipState {
  raw: boolean;
  net: boolean;
  accuracy: boolean;
  characters: boolean;
}

const GameResults: FunctionComponent<Props> = ({
  timerSetting,
  characters,
  resetGame,
  chartData,
}) => {
  const [showTooltip, setShowTooltip] = useState<ScoreToolTipState>({
    raw: false,
    net: false,
    accuracy: false,
    characters: false,
  });

  const { correct, incorrect, extra, total } = characters;
  const minutes = timerSetting / 60;
  const grossWpmNumerator = total / 5;
  const grossWpm = Math.floor(grossWpmNumerator / minutes);

  const uncorrectedErrors = incorrect / minutes;
  const netWpm = Math.floor(grossWpm - uncorrectedErrors);
  const accuracy = Math.floor((correct / total) * 100);

  return (
    <div>
      <div className={styles.resultsInfoContainer}>
        <div
          className={styles.resultsInfo}
          onMouseEnter={() =>
            setShowTooltip((prev) => ({ ...prev, raw: true }))
          }
          onMouseLeave={() =>
            setShowTooltip((prev) => ({ ...prev, raw: false }))
          }
        >
          {showTooltip.raw && (
            <Tooltip>(total characters &divide; 5) &divide; minutes</Tooltip>
          )}
          <h4 className={styles.resultsInfoHeader}>raw</h4>
          <p className={styles.resultsInfoText}>{grossWpm}</p>
        </div>
        <div
          className={styles.resultsInfo}
          onMouseEnter={() =>
            setShowTooltip((prev) => ({ ...prev, net: true }))
          }
          onMouseLeave={() =>
            setShowTooltip((prev) => ({ ...prev, net: false }))
          }
        >
          {showTooltip.net && (
            <Tooltip>raw - (incorrect &divide; minutes)</Tooltip>
          )}
          <h4 className={styles.resultsInfoHeader}>wpm</h4>
          <p className={styles.resultsInfoText}>{netWpm}</p>
        </div>
        <div
          className={styles.resultsInfo}
          onMouseEnter={() =>
            setShowTooltip((prev) => ({ ...prev, accuracy: true }))
          }
          onMouseLeave={() =>
            setShowTooltip((prev) => ({ ...prev, accuracy: false }))
          }
        >
          {showTooltip.accuracy && (
            <Tooltip>correct &divide; total &times; 100</Tooltip>
          )}
          <h4 className={styles.resultsInfoHeader}>accuracy</h4>
          <p className={styles.resultsInfoText}>
            {accuracy ? `${accuracy}%` : `n/a`}
          </p>
        </div>
        <div
          className={styles.resultsInfo}
          onMouseEnter={() =>
            setShowTooltip((prev) => ({ ...prev, characters: true }))
          }
          onMouseLeave={() =>
            setShowTooltip((prev) => ({ ...prev, characters: false }))
          }
        >
          {showTooltip.characters && (
            <Tooltip>correct/incorrect/extra/total</Tooltip>
          )}
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
