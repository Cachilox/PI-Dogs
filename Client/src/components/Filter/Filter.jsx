import styles from "./Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByTemperament,
  filterCreated,
  searchTemperament,
} from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import { GrPowerReset } from "react-icons/gr";

const Filter = ({
  paginate,
  allDogs,
  allTemps,
  checksTemperaments,
  setChecksTemperaments,
}) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [searchTemp, setSearchTemp] = useState("");

  useEffect(() => {
    dispatch(searchTemperament(searchTemp));
  }, [dispatch, searchTemp]);

  const handleChecksTemp = (e) => {
    const { checked, value } = e.target;
    let updateList = checked
      ? [...checksTemperaments, value]
      : checksTemperaments.filter((temp) => temp !== value);
    setChecksTemperaments(updateList);
    dispatch(filterByTemperament(updateList));
    paginate(1);
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
    paginate(1);
  };

  const handleReset = () => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    setChecksTemperaments([]);
    setSearchTemp("");
    dispatch(filterByTemperament([]));
    allTemps();
    allDogs();
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
            value={searchTemp}
            type="search"
            onChange={(e) => setSearchTemp(e.target.value)}
          />
          <button
            onClick={handleReset}
            name="temperament"
            className={styles.reset}
          >
            <GrPowerReset />
          </button>
        </div>
        <section>
          {temperaments.map((temp) => {
            if (checksTemperaments.find((e) => e === temp.name)) {
              return (
                <div key={temp.id}>
                  <input
                    onChange={handleChecksTemp}
                    key={temp.id}
                    value={temp.name}
                    type="checkbox"
                    checked
                  ></input>
                  <span>{temp.name}</span>
                </div>
              );
            } else {
              return (
                <div key={temp.id}>
                  <input
                    onChange={handleChecksTemp}
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
          onChange={handleFilterCreated}
          defaultValue={"DEFAULT"}
        >
          <option disabled value={"DEFAULT"}>
            Filter by created
          </option>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>
      </section>
    </div>
  );
};

export default Filter;
