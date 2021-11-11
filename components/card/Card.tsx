import { FunctionComponent } from "react";
import styles from "../../styles/components/card/Card.module.css";

interface Props {}

const Card: FunctionComponent<Props> = () => {
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardTitle}>Header</h2>
      <img className={styles.cardImage} src="/the_homie.jpg" />
      <div className={styles.cardLinkContainer}>
        <a className={styles.cardLink} href="#">
          Link Btn
        </a>
        <a className={styles.cardLink} href="#">
          Link Btn
        </a>
      </div>
      <p className={styles.cardDescription}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sapiente
        quibusdam repudiandae, dicta omnis repellendus consequatur. Culpa et id
        tenetur numquam aliquam ex velit eligendi beatae, ad sed eveniet error.
      </p>
    </div>
  );
};

export default Card;
