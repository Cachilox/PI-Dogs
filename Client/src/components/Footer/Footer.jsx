import styles from "./Footer.module.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.social_links}>
        <div>
          <a
            href="https://github.com/Cachilox"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} width="32px" height="32px" alt="Github icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/cachilo/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={linkedin}
              width="32px"
              height="32px"
              alt="Linkedin icon"
            />
          </a>
        </div>
      </div>
      <div className={styles.copy}>
        <span>Desarrollado por Mariano Alvarez © 2023</span>
      </div>
    </div>
  );
};

export default Footer;
