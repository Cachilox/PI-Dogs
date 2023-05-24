import styles from "./Navbar.module.css";
import logo from "../../assets/dog.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, paginate }) => {
  return (
    <header className={styles.header}>
      <Link to="/home">
        <img className={styles.logo_dog} src={logo} alt="dog logo" />
      </Link>
      <div>
        <Link to="/create">
          <button className={styles.createDog}>Create dog</button>
        </Link>
      </div>
      <div className={styles.group}>
        <SearchBar onSearch={onSearch} paginate={paginate} />
      </div>
    </header>
  );
};

export default Navbar;
