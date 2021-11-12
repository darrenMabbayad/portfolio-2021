import styles from "@styles/components/typing-game/TypingGame.module.scss";
import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { RandomWords } from "./typing-game.types";
import { shuffle } from "./utils/typing-game.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMousePointer,
  faPlayCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import GameResults from "./GameResults";
import { faPauseCircle } from "@fortawesome/free-regular-svg-icons";

interface Props {
  startTimer: Dispatch<SetStateAction<boolean>>;
  resetTimer: () => void;
  resetGame: () => void;
  isTimerActive: boolean;
  showResults: boolean;
  timerSetting: number;
  timer: number;
}

interface Score {
  correct: number;
  incorrect: number;
  extra: number;
  total: number;
}

export const TypingGame: FunctionComponent<Props> = ({
  startTimer,
  resetTimer,
  resetGame,
  isTimerActive,
  showResults,
  timerSetting,
  timer,
}) => {
  const [words, setWords] = useState<RandomWords>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [characterScore, setCharacterScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
    extra: 0,
    total: 0,
  });
  const [chartData, setChartData] = useState<Array<Score>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const typingCursorRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    // check if the first or last character entered is a SPACE
    if (value === " ") return;

    setCharacterScore((prev) => ({ ...prev, total: prev.total + 1 }));
    setInputVal(value);
    checkLetters();
  }

  function checkLetters() {
    if (
      wordsContainerRef.current &&
      inputRef.current &&
      typingCursorRef.current
    ) {
      const activeWord =
        wordsContainerRef.current.querySelector(".word-div.active");
      const letterList = activeWord
        ? activeWord.querySelectorAll(".letter-div")
        : null;
      const inputValArray = inputRef.current.value.split("");

      if (activeWord && letterList) {
        if (inputValArray.length > letterList.length) {
          const newLetter = document.createElement("div");
          newLetter.innerText = inputValArray[inputValArray.length - 1];
          newLetter.classList.add("letter-div");
          newLetter.classList.add("extra-letter");
          newLetter.classList.add("incorrect");
          activeWord?.appendChild(newLetter);
          const appendedLetters = activeWord?.querySelectorAll(".extra-letter");
          const lastAppendedLetter = appendedLetters[
            appendedLetters.length - 1
          ] as HTMLDivElement;

          if (lastAppendedLetter) {
            typingCursorRef.current.style.top = `${lastAppendedLetter.offsetTop}px`;
            typingCursorRef.current.style.left = `${
              lastAppendedLetter.offsetLeft + lastAppendedLetter.clientWidth
            }px`;
          }

          setCharacterScore((prev) => ({
            ...prev,
            extra: prev.extra + 1,
            incorrect: prev.incorrect + 1,
          }));
          return;
        }

        for (const i of letterList.keys()) {
          if (!inputValArray[i]) {
            const letters = activeWord.querySelectorAll(".correct,.incorrect");
            const lastLetter = letters[i] as HTMLDivElement;
            if (lastLetter) {
              typingCursorRef.current.style.top = `${lastLetter.offsetTop}px`;
              typingCursorRef.current.style.left = `${lastLetter.offsetLeft}px`;

              if (lastLetter.classList.contains("correct")) {
                setCharacterScore((prev) => ({
                  ...prev,
                  correct: prev.correct - 1,
                }));
              } else if (lastLetter.classList.contains("incorrect")) {
                setCharacterScore((prev) => ({
                  ...prev,
                  incorrect: prev.incorrect - 1,
                }));
              }
            }
            letterList[i].classList.remove("correct");
            letterList[i].classList.remove("incorrect");
            return;
          }

          if (
            letterList[i].classList.contains("correct") ||
            letterList[i].classList.contains("incorrect")
          ) {
            continue;
          }

          if (inputValArray[i] == letterList[i].innerHTML) {
            letterList[i].classList.add("correct");
            const letters = activeWord.querySelectorAll(".correct");
            const lastLetter = letters[letters.length - 1] as HTMLDivElement;
            typingCursorRef.current.style.top = `${lastLetter.offsetTop}px`;
            typingCursorRef.current.style.left = `${
              lastLetter.offsetLeft + lastLetter.clientWidth
            }px`;
            setCharacterScore((prev) => ({
              ...prev,
              correct: prev.correct + 1,
            }));
            return;
          } else {
            letterList[i].classList.add("incorrect");
            const letters = activeWord?.querySelectorAll(".incorrect");
            const lastLetter = letters[letters.length - 1] as HTMLDivElement;
            typingCursorRef.current.style.top = `${lastLetter.offsetTop}px`;
            typingCursorRef.current.style.left = `${
              lastLetter.offsetLeft + lastLetter.clientWidth
            }px`;
            setCharacterScore((prev) => ({
              ...prev,
              incorrect: prev.incorrect + 1,
            }));
            return;
          }
        }

        // condition for first appended letter
        if (letterList) {
          const lastLetter = letterList[
            letterList.length - 1
          ] as HTMLDivElement;
          typingCursorRef.current.style.top = `${lastLetter.offsetTop}px`;
          typingCursorRef.current.style.left = `${
            lastLetter.offsetLeft + lastLetter.clientWidth
          }px`;
        }
      }
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (!isTimerActive && event.keyCode === 32) {
      event.preventDefault();
    }

    const activeWord =
      wordsContainerRef?.current?.querySelector(".word-div.active");
    const letterList = activeWord?.querySelectorAll(".letter-div");

    if (typingCursorRef.current) {
      if (event.keyCode === 32) {
        // check SPACEBAR keypress and check status of each letter
        let isCorrect = true;
        letterList?.forEach((letter) => {
          if (!letter.classList.contains("correct")) {
            isCorrect = false;
          }
        });
        if (!isCorrect) {
          const incorrectLetters = activeWord?.querySelectorAll(".incorrect");
          if (incorrectLetters) {
            const lastIncorrectLetter = incorrectLetters[
              incorrectLetters.length - 1
            ] as HTMLDivElement;
            activeWord?.nextElementSibling?.classList.add("active");

            if (lastIncorrectLetter) {
              typingCursorRef.current.style.top = `${lastIncorrectLetter.offsetTop}px`;
              typingCursorRef.current.style.left = `${
                lastIncorrectLetter.offsetLeft + lastIncorrectLetter.clientWidth
              }px`;
            }
          }
          return;
        } else {
          if (activeWord?.nextElementSibling) {
            const nextWord = activeWord?.nextElementSibling as HTMLDivElement;
            activeWord?.nextElementSibling?.classList.add("active");
            typingCursorRef.current.style.top = `${nextWord.offsetTop}px`;
            typingCursorRef.current.style.left = `${nextWord.offsetLeft}px`;
          } else {
            typingCursorRef.current.style.top = `2px`;
            typingCursorRef.current.style.left = `2px`;
            setWords(shuffle());
          }
          activeWord?.classList.remove("active");
          setInputVal("");
          return;
        }
      } else if (event.keyCode === 8) {
        // check BACKSPACE
        if (
          letterList &&
          letterList[letterList.length - 1].classList.contains("extra-letter")
        ) {
          activeWord?.removeChild(letterList[letterList.length - 1]);
          setCharacterScore((prev) => ({
            ...prev,
            incorrect: prev.incorrect - 1,
            extra: prev.extra - 1,
          }));
        }
        return;
      } else return;
    }
  }

  function startGame() {
    clearExtraLetters();
    setCharacterScore({
      correct: 0,
      incorrect: 0,
      extra: 0,
      total: 0,
    });
    setInputVal("");
    inputRef.current?.focus();
    startTimer(true);
  }

  function pauseGame() {
    clearExtraLetters();
    startTimer(false);
  }

  function tryAgain() {
    if (typingCursorRef.current) {
      typingCursorRef.current.style.top = "2px";
      typingCursorRef.current.style.left = "2px";
    }

    clearExtraLetters();
    setInputVal("");
    setWords(shuffle());
    inputRef.current?.focus();
    resetTimer();
  }

  function clearExtraLetters() {
    if (wordsContainerRef.current) {
      const extraLetters =
        wordsContainerRef.current.querySelectorAll(".extra-letter");
      extraLetters.forEach((letter) => letter.remove());
    }
  }

  /* 
    when we hit the end of the rendered word list, 
    set the first word of the new list as active
  */
  useEffect(() => {
    if (words.length > 0) {
      if (wordsContainerRef.current && inputRef.current) {
        wordsContainerRef.current
          .querySelectorAll(".word-div")[0]
          .classList.add("active");
      }
    }
  }, [words]);

  /*
    if the user pauses, then changes the time setting, clear any 
    correct/incorrect classnames and reset the word array
  */
  useEffect(() => {
    if (wordsContainerRef.current) {
      const typedLetters = wordsContainerRef.current.querySelectorAll(
        ".correct,.incorrect"
      );
      typedLetters.forEach((letter) => {
        if (letter.classList.contains("correct")) {
          letter.classList.remove("correct");
        } else if (letter.classList.contains("incorrect")) {
          letter.classList.remove("incorrect");
        }
      });
      setWords(shuffle());
    }
  }, [timerSetting]);

  /*
    track the characterScore every second 
  */
  useEffect(() => {
    const temp = [...chartData, characterScore];
    setChartData(temp);
  }, [timer]);

  useEffect(() => {
    const firstRenderWords = shuffle();
    setWords(firstRenderWords);
  }, []);

  useEffect(() => {
    // keydown to detect holding down keys
    if (document) {
      document.addEventListener("keydown", handleKeyUp);
    }
    return () => {
      if (document) {
        document.addEventListener("keydown", handleKeyUp);
      }
    };
  }, [isTimerActive]);

  if (showResults) {
    return (
      <GameResults
        timerSetting={timerSetting}
        characters={characterScore}
        resetGame={() => {
          setInputVal("");
          const newWords = shuffle();
          setWords(newWords);
          resetGame();
        }}
        chartData={chartData}
      />
    );
  }

  return (
    <>
      <div className={styles.typingGameContainer}>
        {isTimerActive && (
          <div className={styles.typingCursor} ref={typingCursorRef} />
        )}
        <div
          className={
            isTimerActive
              ? `${styles.outOfFocusWarning} ${styles.focused}`
              : `${styles.outOfFocusWarning}`
          }
        >
          <FontAwesomeIcon
            className={styles.outOfFocusWarningIcon}
            icon={faMousePointer}
          />
          <p className={styles.outOfFocusWarningText}>Click start to begin!</p>
        </div>
        <input
          className={styles.typingInput}
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          value={inputVal}
          onChange={(e) => handleInput(e)}
          ref={inputRef}
        />
        <div
          className={
            isTimerActive
              ? `${styles.wordsContainer}`
              : `${styles.wordsContainer} ${styles.blurred}`
          }
          ref={wordsContainerRef}
        >
          {words.map((word, index) => {
            const map = Array.prototype.map;
            return (
              <div
                key={`typing-game-word-${index}`}
                className={
                  index === 0
                    ? `${styles.word} word-div active`
                    : `${styles.word} word-div`
                }
              >
                {map.call(word, (letter, letterIdx) => {
                  return (
                    <div
                      key={`${letter}-letter-${letterIdx}-for-${word}-${index}`}
                      className={`${styles.letter} letter-div`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {!isTimerActive && (
          <button
            className={styles.gameButton}
            onClick={() => {
              startGame();
            }}
          >
            <FontAwesomeIcon
              className={styles.gameButtonIcon}
              icon={faPlayCircle}
            />
          </button>
        )}
        {isTimerActive && (
          <button
            className={`${styles.gameButton} ${styles.gameButtonSmall}`}
            onClick={() => {
              tryAgain();
            }}
          >
            <FontAwesomeIcon className={styles.gameButtonIcon} icon={faUndo} />
          </button>
        )}
        {isTimerActive && (
          <button
            className={styles.gameButton}
            onClick={() => {
              pauseGame();
            }}
          >
            <FontAwesomeIcon
              className={styles.gameButtonIcon}
              icon={faPauseCircle}
            />
          </button>
        )}
      </div>
    </>
  );
};
