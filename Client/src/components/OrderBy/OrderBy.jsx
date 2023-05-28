import styles from "./OrderBy.module.css";
import { useDispatch } from "react-redux";
import {
  orderByAlphabet,
  orderWeight,
} from "../../redux/actions/actions";

const OrderBy = () => {
  const dispatch = useDispatch();

  const handleAlphabetOrder = (event) => {
    const order = event.target.value;
    dispatch(orderByAlphabet(order));
  };

  const handleWeightOrder = (event) => {
    const order = event.target.value;
    dispatch(orderWeight(order));
  };

  return (
    <div className={styles.orderContainer}>
      <h2>Order By</h2>
      <hr />
      <span>Alphabetically</span>
      <select
        name="Alphabetic"
        onChange={handleAlphabetOrder}
        defaultValue={"DEFAULT"}
      >
        <option disabled value={"DEFAULT"}>
          Select order
        </option>
        <option value="Ascendent">Ascending</option>
        <option value="Descendent">Descending</option>
      </select>
      <span>In weight order</span>
      <select
        name="Weight"
        onChange={handleWeightOrder}
        defaultValue={"DEFAULT"}
      >
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
