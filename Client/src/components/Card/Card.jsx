import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { getWeightText, getTempText } from "../../utils/formatText";

const Card = ({ id, name, image, temperament, weightMin, weightMax }) => {

  let tempTxt = getTempText(temperament);
  let weightTxt = getWeightText(weightMin, weightMax);

  return (
    <div className={styles.cardContainer}>
      <Link to={`/detail/${id}`}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <img width={250} height={200} className={styles.img} src={image} alt={name} loading="lazy" />
          </div>

          <div className={styles.card_body}>
            <h3>{name}</h3>
            <p>{tempTxt}</p> 
          </div>

          <div className={styles.card_footer}>
            <h4>WEIGHT: {weightTxt}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
