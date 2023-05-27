import styles from "./Navbar.module.css";
import logo from "../../assets/dog.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <Link to="/home">
        <img className={styles.logo_dog} width={72} src={logo} alt="dog logo" />
      </Link>
      <div>
        <Link to="/create">
          <button className={styles.createDog}>Create dog</button>
        </Link>
      </div>
      <div className={styles.group}>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Navbar;
