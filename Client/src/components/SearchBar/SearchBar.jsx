import searchIcon from "../../assets/lupa.svg";
import closeIcon from "../../assets/close-icon.png";
import "./SearchBar.css";
import { useState } from "react";

const SearchBar = ({ onSearch, paginate }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [race, setRace] = useState("");

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
    paginate(1);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <span className="icons">
        <button className="button-search" type="submit">
          <img
            onClick={handleOpenSearch}
            className="icon searchBtn"
            src={searchIcon}
            alt="search icon"
          />
        </button>
        {searchOpen && (
          <button className="button-search" onClick={() => setRace("")}>
            <img
              onClick={handleCloseSearch}
              className="icon closeBtn"
              src={closeIcon}
              alt="close icon"
            />
          </button>
        )}
      </span>
      <div className={`searchBox ${searchOpen ? "active" : ""}`}>
        <input
          onChange={handleInputChange}
          value={race}
          type="search"
          placeholder="Search dog name ..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
