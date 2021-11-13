import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import styles from "@styles/components/typing-game/TypingGame.module.scss";
import Tooltip from "@components/common/Tooltip";
import { ScoreToolTipState, ScoreWithTimeStamp } from "./typing-game.types";
import Chart from "@components/chart/Chart";

interface Props {
  characters: {
    correct: number;
    incorrect: number;
    extra: number;
    total: number;
  };
  resetGame: () => void;
  chartData: Array<ScoreWithTimeStamp>;
}

const GameResults: FunctionComponent<Props> = ({
  characters,
  resetGame,
  chartData,
}) => {
  const [showTooltip, setShowTooltip] = useState<ScoreToolTipState>({
    accuracy: false,
    characters: false,
  });

  const { correct, incorrect, extra, total } = characters;
  const accuracy = Math.floor((correct / total) * 100);

  const scoreOverTime = chartData.map((dataset) => {
    const minutes = dataset.second / 60;
    const grossWpmNumerator = dataset.total / 5;
    const grossWpm = Math.floor(grossWpmNumerator / minutes);

    const uncorrectedErrors = dataset.incorrect / minutes;
    const netWpm = Math.floor(grossWpm - uncorrectedErrors);
    return {
      rawWpm: grossWpm,
      netWpm: netWpm,
      errors: dataset.incorrect,
      second: dataset.second,
    };
  });

  const timeSet = scoreOverTime.map((entry) => entry.second.toString());
  const rawWpmSet = scoreOverTime.map((entry) => entry.rawWpm);
  const netWpmSet = scoreOverTime.map((entry) => entry.netWpm);
  const errorSet = scoreOverTime.map((entry) => entry.errors);

  const avgRaw = Math.floor(
    rawWpmSet.reduce((total, current) => total + current) / rawWpmSet.length
  );
  const avgNet = Math.floor(
    netWpmSet.reduce((total, current) => total + current) / netWpmSet.length
  );

  const dataSets = {
    timeSet: timeSet,
    rawWpmSet: rawWpmSet,
    netWpmSet: netWpmSet,
    errorSet: errorSet,
  };

  return (
    <>
      <Chart chartData={dataSets} />
      <div className={styles.resultsInfoContainer}>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>raw</h4>
          <p className={styles.resultsInfoText}>{avgRaw}</p>
        </div>
        <div className={styles.resultsInfo}>
          <h4 className={styles.resultsInfoHeader}>wpm</h4>
          <p className={styles.resultsInfoText}>{avgNet}</p>
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
    </>
  );
};

export default GameResults;
