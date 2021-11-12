import styles from "@styles/components/layout/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <h3 className={styles.navlogo}>{`<dm />`}</h3>
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
