import styles from "./Landing.module.css";
import logo from "../../assets/dog-logo.png"
import {Link} from "react-router-dom"


const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <div>
        <h1 className={styles.title}>Henry Dogs</h1>
        <img className={styles.logo} src={logo} alt="logo dog" />
        <Link to="/home">
          <button className={styles.home}>HOME</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing;
