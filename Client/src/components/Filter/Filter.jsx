import styles from "./Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { searchTemperament } from "../../redux/actions/actions";
import reset_icon from "../../assets/reset-icon.svg"

const Filter = ({ filter, paginate, allDogs }) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [checksTemperaments, setChecksTemperaments] = useState([]);

  const handleSearchTemp = (event) => {
    dispatch(searchTemperament(event.target.value));
  };

  const handleChecksTemp = (e) => {
    const { checked, value } = e.target;
    let updateList = checked
      ? [...checksTemperaments, value]
      : checksTemperaments.filter((temp) => temp !== value);
    setChecksTemperaments(updateList);
    filter("Temperaments", updateList);
    paginate(1);
  };

  const handleReset = () => {
    setChecksTemperaments([]);
    filter("Temperamets", []);
    allDogs()
  };

  const handleFilterCreated = (e) => {
    filter("FilterCreated", e.target.value);
    paginate(1);
  };

  return (
    <div className={styles.filterContainer}>
      <h2>Filters</h2>
      <hr />
      <span>Temperaments</span>
      <section className={styles.section}>
        <div>
          <input
            className={styles.searchTemp}
            placeholder="Search temperaments"
            type="search"
            onChange={handleSearchTemp}
          />
          <button
            onClick={handleReset}
            name="temperament"
            className={styles.reset}
          >
            <img width={20} src={reset_icon} alt="reset icon" />
          </button>
        </div>
        <section>
          {temperaments.map((temp) => {
            if (checksTemperaments.find((e) => e === temp.name)) {
              return (
                <div key={temp.id}>
                  <input
                    onChange={(e) => handleChecksTemp(e)}
                    key={temp.id}
                    value={temp.name}
                    type="checkbox"
                    checked={checksTemperaments.includes(temp.name)}
                  ></input>
                  <span>{temp.name}</span>
                </div>
              );
            } else {
              return (
                <div key={temp.id}>
                  <input
                    onChange={(e) => handleChecksTemp(e)}
                    key={temp.id}
                    value={temp.name}
                    type="checkbox"
                  ></input>
                  <span>{temp.name}</span>
                </div>
              );
            }
          })}
        </section>
      </section>
      <span>Filter Created</span>
      <section>
        <select
          className={styles.selectFilter}
          onChange={(e) => handleFilterCreated(e)}
          defaultValue={"DEFAULT"}
        >
          <option disabled value={"DEFAULT"}>
            Filter by created
          </option>
          <option value="all">
            All
          </option>
          <option value="created">
            Created
          </option>
          <option value="api">
            Api
          </option>
        </select>
      </section>
    </div>
  );
};

export default Filter;
