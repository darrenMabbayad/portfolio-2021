import { FunctionComponent } from "react";
import styles from "@styles/components/card/Card.module.scss";

interface Props {
  title: string;
  image?: string;
  links?: Array<ButtonLink>;
  description?: string;
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
}) => {
  return (
    <div className={styles.cardContainer}>
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
  );
};

export default Card;
