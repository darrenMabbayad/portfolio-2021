import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowAltCircleDown,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@styles/components/layout/Footer.module.scss";
import urls from "@constants/urls";
import { useState } from "react";
import Tooltip from "@components/common/Tooltip";

const Footer = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <footer className={styles.footer} id="contact">
      <a
        className={`${styles.link} ${styles.linkEmail}`}
        href="mailto:mabbayadd@gmail.com"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && <Tooltip>mabbayadd@gmail.com</Tooltip>}
        <FontAwesomeIcon className={styles.linkIcon} icon={faEnvelope} />
        <p className={styles.linkText}>Contact Me</p>
      </a>
      <a
        className={styles.link}
        href={urls.GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon className={styles.linkIcon} icon={faGithub} />
        <p className={styles.linkText}>Github</p>
      </a>
      <a
        className={styles.link}
        href={urls.LINKED_IN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon className={styles.linkIcon} icon={faLinkedin} />
        <p className={styles.linkText}>LinkedIn</p>
      </a>
      <a
        className={styles.link}
        href="https://drive.google.com/file/d/1sOmrYWj4gNU68bXKQM1I-OtREBjO0dbg/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className={styles.linkIcon}
          icon={faArrowAltCircleDown}
        />
        <p className={styles.linkText}>Resume</p>
      </a>
    </footer>
  );
};

export default Footer;
