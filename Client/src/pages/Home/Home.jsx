import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions/actions";
import { useLoading } from "../../hooks/useLoading";

import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination.jsx";
import OrderBy from "../../components/OrderBy/OrderBy";
import Filter from "../../components/Filter/Filter";
import Loading from "../../components/Loading/Loading";

const Home = ({ allDogs, allTemps }) => {
  const { loading } = useLoading();
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [checksTemperaments, setChecksTemperaments] = useState([]);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [allDogs, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.flexFilter}>
          <OrderBy />
          <Filter
            paginate={paginate}
            allDogs={allDogs}
            allTemps={allTemps}
            setChecksTemperaments={setChecksTemperaments}
            checksTemperaments={checksTemperaments}
          />
        </div>
        <div className={styles.FlexCard}>
          {loading ? <Loading /> : <Cards dogs={currentDogs} />}
        </div>
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        totalDogs={dogs.length}
        currentPage={currentPage}
        allDogs={allDogs}
        paginate={paginate}
        checksTemperaments={checksTemperaments}
        setChecksTemperaments={setChecksTemperaments}
      />
    </div>
  );
};

export default Home;
