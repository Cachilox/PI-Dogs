import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/loupe-icon.svg";
import {RxCross2} from "react-icons/rx"

const SearchBar = ({ onSearch }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [race, setRace] = useState("");
  const navigate = useNavigate();

  const handleOpenSearch = () => {
    setSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleInputChange = (event) => {
    setRace(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(race);
    setRace("");
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <span className="icons">
        <button className="button-search" type="submit">
          <img
            width={32}
            onClick={handleOpenSearch}
            className="icon searchBtn"
            src={searchIcon}
            alt="search icon"
          />
        </button>
        {searchOpen && (
          <button className="button-search" onClick={() => setRace("")}>
            <RxCross2 onClick={handleCloseSearch} className="icon closeBtn"  />
          </button>
        )}
      </span>
      <div className={`searchBox ${searchOpen ? "active" : ""}`}>
        <input
          onChange={handleInputChange}
          value={race}
          type="search"
          placeholder="Search dog name..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
