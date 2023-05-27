import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";
import reset_icon from "../../assets/reset-icon.svg";

const Pagination = ({
  dogsPerPage,
  totalDogs,
  paginate,
  currentPage,
  allDogs,
  checksTemperaments,
  setChecksTemperaments
}) => {
  const pageNumbers = [];
  const [numPage, setNumPage] = useState(currentPage);
  const [input, setInput] = useState(numPage);

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value >= 0 && value <= pageNumbers.length) {
      setInput(value);
      setNumPage(value);
      paginate(value);
    } else {
      setInput(1);
      setNumPage(1);
      paginate(1);
    }
  };

  const handleBack = () => {
    if (numPage - 1 > 0) {
      const num = numPage - 1;
      setInput(num);
      setNumPage(num);
      paginate(num);
    } else {
      setInput(pageNumbers.length);
      setNumPage(pageNumbers.length);
      paginate(pageNumbers.length);
    }
  };

  const handleForward = () => {
    if (Number(numPage) + 1 <= pageNumbers.length) {
      const num = Number(numPage) + 1;
      setInput(num);
      setNumPage(num);
      paginate(num);
    } else {
      setInput(1);
      setNumPage(1);
      paginate(1);
    }
  };

  const handleReset = () => {
    paginate(1);
    setInput(1);
    setNumPage(1);
    allDogs();
    setChecksTemperaments([])
  };

  useEffect(() => {
    setInput(1);
    setNumPage(1);
  }, [checksTemperaments])

  return (
    <div className={styles.pagination}>
      <p onClick={handleBack}>&laquo;</p>
      <input
        className={styles.inputP}
        onChange={(e) => handleInputChange(e)}
        value={input}
      />
      <input
        className={styles.inputP}
        value={"/" + pageNumbers.length}
        readOnly
      />
      <p onClick={handleForward}>&raquo;</p>
      <p onClick={handleReset}>
        <img className={styles.reset_icon} width={20} src={reset_icon} alt="reset icon" />
      </p>
    </div>
  );
};

export default Pagination;
