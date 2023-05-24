import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postDog } from "../../redux/actions/actions";
import styles from "./Form.module.css";
import validation from "../../utils/validation";
import back_icon from "../../assets/back-icon.svg"

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);
  const [dogTemperaments, setDogTemperament] = useState([]);
  const [dogData, setDogData] = useState({
    name: "",
    image: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperaments: "",
  });

  useEffect(() => {
    setIsDisabled(Object.values(errors).some((value) => value !== ""));
  }, [errors]);

  const handleTemperaments = (e) => {
    const { value } = e.target;
    let updateList = [...dogTemperaments];
    if (e.target.checked) {
      updateList = [...dogTemperaments, value];
    } else {
      updateList.splice(dogTemperaments.indexOf(value), 1);
    }
    setDogTemperament(updateList);
    setErrors(validation(dogData, updateList));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDogData({
      ...dogData,
      [name]: value,
    });
    setErrors(
      validation(
        {
          ...dogData,
          [name]: value,
        },
        dogTemperaments
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Object.keys(validation(dogData, dogTemperaments)).length === 0) {
        const dog = {
          name: dogData.name,
          image: dogData.image,
          heightMin: dogData.heightMin,
          heightMax: dogData.heightMax,
          weightMin: dogData.weightMin,
          weightMax: dogData.weightMax,
          lifeSpanMin: dogData.lifeSpanMin,
          lifeSpanMax: dogData.lifeSpanMax,
          temperament: dogTemperaments,
        };

        dispatch(postDog(dog));

        window.alert("Raza de perro creada");
        setDogData({
          name: "",
          image: "",
          heightMin: "",
          heightMax: "",
          weightMin: "",
          weightMax: "",
          lifeSpanMin: "",
          lifeSpanMax: "",
        });
        setDogTemperament([]);
      
        document
          .querySelectorAll("input[type=checkbox]")
          .forEach((el) => (el.checked = false));
        navigate("/home");
      } else {
        window.alert("data is missing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={`container ${styles.form}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.back}>
        <Link to="/home">
          <button className={styles.backBtn}>
            <img width={30} src={back_icon} alt="back_icon" />
          </button>
        </Link>
      </div>
      <h1>CREATE BREED</h1>
      <hr />
      <div>
        <div className={styles.box}>
          <span>Name</span>
          <input
            className={`${errors.name && styles.warning} ${styles.inputForm}`}
            onChange={(e) => handleInputChange(e)}
            name="name"
            type="text"
            value={dogData.name}
            placeholder="Type name"
          />
        </div>
        <p className={styles.error}> {errors.name}</p>
        <div className={styles.contenedor}>
          <div className={styles.box}>
            <span>Height</span>
            <input
              className={`${
                errors.height ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              name="heightMin"
              value={dogData.heightMin}
              placeholder="MIN"
              min="1"
              max="200"
            />
            <input
              className={`${
                errors.height ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              min="1"
              value={dogData.heightMax}
              name="heightMax"
              placeholder="MAX"
              max="200"
            />
          </div>
          <div className={styles.box}>
            <span>Weight</span>
            <input
              className={`${
                errors.weight ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              value={dogData.weightMin}
              placeholder="MIN"
              name="weightMin"
              min="1"
              max="100"
            />
            <input
              className={`${
                errors.weight ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              placeholder="MAX"
              name="weightMax"
              value={dogData.weightMax}
              min="1"
              max="100"
            />
          </div>
          <div className={styles.box}>
            <span>Life span</span>
            <input
              className={`${
                errors.lifeSpan ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              value={dogData.lifeSpanMin}
              placeholder="MIN"
              name="lifeSpanMin"
              min="1"
              max="200"
            />
            <input
              className={`${
                errors.lifeSpan ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              placeholder="MAX"
              min="1"
              max="200"
              value={dogData.lifeSpanMax}
              name="lifeSpanMax"
            />
          </div>
        </div>
      </div>
      <p className={styles.error}>
        {errors.height || errors.weight || errors.lifeSpan}
      </p>
      <div className={styles.inputImage}>
        <span>Imagen</span>
        <input
          className={`${errors.image && styles.warning} ${styles.inputForm}`}
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="URL"
          value={dogData.image}
          name="image"
        ></input>
      </div>
      <p className={styles.error}> {errors.image}</p>
      <div className={styles.temperaments}>
        <strong>Temperament/s</strong>
        <section className={styles.section}>
          {temperaments?.map((e) => {
            return (
              <div key={e.id}>
                <input
                  className={styles.inputForm}
                  onChange={handleTemperaments}
                  value={e.name}
                  type="checkbox"
                ></input>
                <span>{e.name ? e.name : "undefined"}</span>
              </div>
            );
          })}
        </section>
      </div>
      <p className={styles.error}>{errors.temperaments}</p>

      <button
        className={`${styles.button}`}
        type="submit"
        disabled={isDisabled}
      >
        Create dog
      </button>
      <hr></hr>
    </form>
  );
};

export default Form;
