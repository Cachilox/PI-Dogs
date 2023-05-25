import styles from "./DogDetail.module.css";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { details, cleanDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import back_icon from "../../assets/back-icon.svg";
import { useLoading } from "../../hooks/useLoading";
import Loading from "../Loading/Loading";

import {
  getHeightText,
  getWeightText,
  getLifeSpanText,
} from "../../utils/formatText";

const DogDetail = () => {
  const {loading} = useLoading(1300)
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.dogDetails);

  useEffect(() => {
    dispatch(details(id));
    return () => dispatch(cleanDetail());
  }, [id, dispatch]);


  let heightTxt = getHeightText(detail.heightMin, detail.heightMax);
  let weightTxt = getWeightText(detail.weightMin, detail.weightMax);
  let lifeSpanTxt = getLifeSpanText(detail.lifeSpanMin, detail.lifeSpanMax);

  return (
    <div className={`container ${styles.containerDetail}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.back}>
            <Link to="/home">
              <button className={styles.backDetail}>
                <img width={30} src={back_icon} alt="back icon" />
              </button>
            </Link>
          </div>
          <div className={styles.detail}>
            <div className={styles.detail_header}>
              <img
                className={styles.img}
                src={detail.image}
                alt={detail.name}
              ></img>
            </div>

            <div className={styles.detail_body}>
              <div className={styles.detail_info}>
                <h2>{detail.name}</h2>
                <div className={styles.detail_content}>
                  <div className={styles.detail_data}>
                    <div className="detail_item">
                      <h3>Weight</h3> {weightTxt}
                    </div>
                    <div className="detail_item">
                      <h3>Height</h3> {heightTxt}
                    </div>
                    <div className="detail_item">
                      <h3>Life Span</h3> {lifeSpanTxt}
                    </div>
                  </div>
                </div>
                <div className={styles.detail_temperament}>
                  <h4>Temperament:</h4>
                  <span className="temperament-tag">{detail.temperament}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DogDetail;
