import styles from "../../styles/components/typing-game/TypingGame.module.css";
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
}) => {
  const [words, setWords] = useState<RandomWords>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [characterScore, setCharacterScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
    extra: 0,
    total: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const typingCursorRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    // check if the first or last character entered is a SPACE
    // (value === " " || value.split("")[value.length - 1] === " ") return;
    if (value === " ") return;

    setCharacterScore((prev) => ({ ...prev, total: prev.total + 1 }));
    setInputVal(value);
    checkLetters();
  }

  function checkLetters() {
    if (wordsContainerRef.current && inputRef.current) {
      const activeWord =
        wordsContainerRef.current.querySelector(".word-div.active");
      const letterList = activeWord
        ? activeWord.querySelectorAll(".letter-div")
        : null;
      const inputValArray = inputRef.current.value.split("");

      if (letterList) {
        if (inputValArray.length > letterList.length) {
          const newLetter = document.createElement("div");
          newLetter.innerText = inputValArray[inputValArray.length - 1];
          newLetter.classList.add("letter-div");
          newLetter.classList.add("extra-letter");
          newLetter.classList.add("incorrect");
          activeWord?.appendChild(newLetter);
          setCharacterScore((prev) => ({
            ...prev,
            extra: prev.extra + 1,
            incorrect: prev.incorrect + 1,
          }));
        }

        for (const i of letterList.keys()) {
          if (!inputValArray[i]) {
            letterList[i].classList.remove("correct");
            letterList[i].classList.remove("incorrect");
            continue;
          }

          if (
            letterList[i].classList.contains("correct") ||
            letterList[i].classList.contains("incorrect")
          ) {
            continue;
          }

          if (inputValArray[i] == letterList[i].innerHTML) {
            letterList[i].classList.add("correct");
            setCharacterScore((prev) => ({
              ...prev,
              correct: prev.correct + 1,
            }));
            return;
          } else {
            letterList[i].classList.add("incorrect");
            setCharacterScore((prev) => ({
              ...prev,
              incorrect: prev.incorrect + 1,
            }));
            return;
          }
        }
      }
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    const activeWord =
      wordsContainerRef?.current?.querySelector(".word-div.active");
    const letterList = activeWord?.querySelectorAll(".letter-div");

    if (event.keyCode === 32) {
      // check SPACEBAR keypress and check status of each letter
      changeCursorLocation("spacebar");
      let isCorrect = true;
      letterList?.forEach((letter) => {
        if (!letter.classList.contains("correct")) {
          isCorrect = false;
        }
      });
      if (!isCorrect) {
        return;
      } else {
        if (activeWord?.nextElementSibling) {
          activeWord?.nextElementSibling?.classList.add("active");
        } else {
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
      changeCursorLocation("backspace");
      return;
    }
    changeCursorLocation();
  }

  function changeCursorLocation(keyPressed?: string) {
    if (typingCursorRef.current && wordsContainerRef.current) {
      const typingCursor = typingCursorRef.current;
      const activeWord = wordsContainerRef?.current?.querySelector(
        ".word-div.active"
      ) as HTMLDivElement;
      const letters = activeWord.querySelectorAll(
        ".correct:not(.extra-letter),.incorrect:not(.extra-letter)"
      );
      const lastLetter = letters[letters.length - 1] as HTMLDivElement;

      if (!lastLetter) {
        if (keyPressed === "backspace") return; // can't backspace before beginning to type for a word
        if (keyPressed === "spacebar") {
          // moving on to the next word
          typingCursor.style.top = `${activeWord.offsetTop}px`;
          typingCursor.style.left = `${activeWord.offsetLeft}px`;
          return;
        }

        // typing for the first letter of a word handled here -- lastLetter is null, so position with the first letter
        const firstLetter = activeWord.querySelector(
          ".letter-div"
        ) as HTMLDivElement;
        typingCursor.style.top = `${firstLetter.offsetTop}px`;
        typingCursor.style.left = `${
          firstLetter.offsetLeft + firstLetter.clientWidth
        }px`;
        return;
      }

      if (lastLetter) {
        const nextEl = lastLetter.nextElementSibling as HTMLDivElement;
        const prevEl = lastLetter.previousElementSibling as HTMLDivElement;
        if (!nextEl) {
          if (keyPressed === "backspace") {
            typingCursor.style.top = `${lastLetter.offsetTop}px`;
            typingCursor.style.left = `${lastLetter.offsetLeft}px`;
            return;
          }
        }

        if (nextEl) {
          if (keyPressed === "backspace") {
            if (prevEl) {
              typingCursor.style.top = `${lastLetter.offsetTop}px`;
              typingCursor.style.left = `${lastLetter.offsetLeft}px`;
              return;
            }
            if (!prevEl) {
              typingCursor.style.top = `${activeWord.offsetTop}px`;
              typingCursor.style.left = `${activeWord.offsetLeft}px`;
              return;
            }
            typingCursor.style.top = `${lastLetter.offsetTop}px`;
            typingCursor.style.left = `${
              lastLetter.offsetLeft + lastLetter.clientWidth
            }px`;
            return;
          }

          if (
            lastLetter.nextElementSibling?.classList.contains("extra-letter")
          ) {
            return;
          }

          typingCursor.style.top = `${nextEl.offsetTop}px`;
          typingCursor.style.left = `${
            nextEl.offsetLeft + nextEl.clientWidth
          }px`;
          return;
        }
      }
    }
  }

  function startGame() {
    clearExtraLetters();
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
    setCharacterScore({
      correct: 0,
      incorrect: 0,
      extra: 0,
      total: 0,
    });
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
          <FontAwesomeIcon icon={faMousePointer} />
          <p>Click start to begin!</p>
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
            <FontAwesomeIcon icon={faPlayCircle} />
          </button>
        )}
        {isTimerActive && (
          <button
            className={`${styles.gameButton} ${styles.gameButtonSmall}`}
            onClick={() => {
              tryAgain();
            }}
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
        )}
        {isTimerActive && (
          <button
            className={styles.gameButton}
            onClick={() => {
              pauseGame();
            }}
          >
            <FontAwesomeIcon icon={faPauseCircle} />
          </button>
        )}
      </div>
    </>
  );
};
