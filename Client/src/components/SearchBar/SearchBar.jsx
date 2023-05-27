import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/loupe-icon.svg";
import closeIcon from "../../assets/close-icon.png";

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
          placeholder="Search dog name..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
