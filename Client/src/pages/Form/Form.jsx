import styles from "./Form.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog } from "../../redux/actions/actions";

import validation from "../../utils/validation";
import {BiArrowBack} from "react-icons/bi"
import FormData from "form-data";
import axios from "axios";
import { toast } from "react-toastify";

const Form = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.allTemperaments);

  const [dogTemperaments, setDogTemperament] = useState([]);

  const [dogData, setDogData] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
  });
  const notify = () => {
    toast.success("🐶 Raza de perro creada!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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
    const { value, checked } = e.target;

    let updatedTemperaments = [...dogTemperaments];

    if (checked) {
      updatedTemperaments = [...dogTemperaments, value];
    } else {
      updatedTemperaments = dogTemperaments.filter(
        (temperament) => temperament !== value
      );
    }

    setDogTemperament(updatedTemperaments);
    setErrors(validation(dogData, updatedTemperaments));
  };

  const handleImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
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
    setLoading(true)
    e.preventDefault();
    try {
      let image = null;
      if (file) {
        const cloudinaryUrl =
          "https://api.cloudinary.com/v1_1/dqiah55rm/image/upload";
        const cloudinaryID = "icieqqlf";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryID);
        const res = await axios.post(cloudinaryUrl, formData, {
          header: {
            "content-type": "multipart/form-data",
          },
        });
        image = res.data.secure_url;
      }
      const dog = {
        name: dogData.name,
        image,
        heightMin: dogData.heightMin,
        heightMax: dogData.heightMax,
        weightMin: dogData.weightMin,
        weightMax: dogData.weightMax,
        lifeSpanMin: dogData.lifeSpanMin,
        lifeSpanMax: dogData.lifeSpanMax,
        temperament: dogTemperaments,
      };
      dispatch(postDog(dog));
      notify();

      setDogData({
        name: "",
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
      setFile(null);
      document
        .querySelectorAll("input[type=file]")
        .forEach((el) => (el.value = null));
      setLoading(false)
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
            <BiArrowBack className="arrowBack"/>
          </button>
        </Link>
      </div>
      <h1>CREATE BREED</h1>
      <hr />
      <div>
        <div className={styles.box}>
          <label htmlFor="name">Name</label>
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
            <label htmlFor="height">Height</label>
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
            <label htmlFor="weight">Weight</label>
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
            <label htmlFor="lifeSpan">Life span</label>
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
        <input
          type="file"
          onChange={handleImage}
          accept="image/png, image/jpeg"
          name="image"
        />
        {file ? (
          <img width={250} alt="prewiew" src={URL.createObjectURL(file)} />
        ) : null}
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
                <span>{e.name}</span>
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
        {loading ? "Creating..." : "Create Dog"}
      </button>
      <hr></hr>
    </form>
  );
};

export default Form;
