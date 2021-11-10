import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowAltCircleDown,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/components/layout/Footer.module.css";
import urls from "../../constants/urls";

const Footer = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.links}>
        <a className={styles.link} href="mailto:mabbayadd@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} />
          <p>Contact Me</p>
        </a>
        <a
          className={styles.link}
          href={urls.GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
          <p>Github</p>
        </a>
        <a
          className={styles.link}
          href={urls.LINKED_IN_URL}
          target="_blank"
          rel="noopener norefferer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          <p>LinkedIn</p>
        </a>
        <a
          className={styles.link}
          href=""
          target="_blank"
          rel="noopener norefferer"
        >
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
          <p>Resume</p>
        </a>
      </div>
      <button className={styles.themeSelector}>
        <FontAwesomeIcon icon={faPalette} />
        <p>theme</p>
      </button>
    </footer>
  );
};

export default Footer;
