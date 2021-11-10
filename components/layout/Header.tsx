import styles from "../../styles/components/layout/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h3>{`<DM />`}</h3>
      <nav className={styles.nav}>
        <a className={styles.navlink} href="#projects">
          projects
        </a>
        <a className={styles.navlink} href="#contact">
          contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
