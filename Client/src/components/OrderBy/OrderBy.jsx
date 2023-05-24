import styles from "./OrderBy.module.css";

const OrderBy = ({ orderBy }) => {
  const handleClick = (event) => {
    event.preventDefault();
    orderBy(event.target.name, event.target.value);
  };

  return (
    <div className={styles.orderContainer}>
      <h2>Order By</h2>
      <hr />
      <span>Alphabetically</span>
      <select name="Alphabetic" onClick={handleClick} defaultValue={"DEFAULT"}>
        <option disabled value={"DEFAULT"}>
          Select order
        </option>
        <option value="Ascendent">Ascending</option>
        <option value="Descendent">Descending</option>
      </select>
      <span>In weight order</span>
      <select name="Weight" onClick={handleClick} defaultValue={"DEFAULT"}>
        <option disabled value={"DEFAULT"}>
          Select order
        </option>
        <option value="Ascendent">Ascending</option>
        <option value="Descendent">Descending</option>
      </select>
    </div>
  );
};

export default OrderBy;
