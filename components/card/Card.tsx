import { FunctionComponent, useState } from "react";
import styles from "@styles/components/card/Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  image?: string;
  links?: Array<ButtonLink>;
  description?: string;
  techList: Array<string>;
}

interface ButtonLink {
  text: string;
  href: string;
}

const Card: FunctionComponent<Props> = ({
  title = "",
  image = "",
  links = [],
  description = "",
  techList = [],
}) => {
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  return (
    <div
      className={
        isCardFlipped
          ? `${styles.cardContainer} ${styles.flippedCard}`
          : `${styles.cardContainer}`
      }
    >
      <div
        className={
          isCardFlipped
            ? `${styles.cardFrontFace} ${styles.hiddenFace}`
            : `${styles.cardFrontFace}`
        }
      >
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.cardImageContainer}>
          <img
            className={styles.cardImage}
            src={image ? `/${image}` : "/the_homie.jpg"}
          />
        </div>
        <div className={styles.cardLinkContainer}>
          {links.map((link, index) => (
            <a
              key={`project-card-${index}`}
              className={styles.cardLink}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div
        className={
          isCardFlipped
            ? `${styles.cardBackFace}`
            : `${styles.cardBackFace} ${styles.hiddenFace}`
        }
      >
        <h2 className={styles.techListHeading}>Tech Used</h2>
        {techList.map((item) => (
          <p key={`${title}-tech-item-${item}`}>{item}</p>
        ))}
      </div>
      <button
        className={styles.cardFlipBtn}
        onClick={() => setIsCardFlipped(!isCardFlipped)}
      >
        <FontAwesomeIcon
          className={styles.cardFlipBtnIcon}
          icon={faArrowRight}
        />
      </button>
    </div>
  );
};

export default Card;
