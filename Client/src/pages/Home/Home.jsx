import styles from "./Home.module.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../redux/actions/actions";
import { useLoading } from "../../hooks/useLoading";

import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
import OrderBy from "../../components/OrderBy/OrderBy";
import Filter from "../../components/Filter/Filter";
import Loading from "../../components/Loading/Loading";

const Home = ({
  dogs,
  allDogs,
  currentPage,
  dogsPerPage,
  currentDogs,
  paginate,
  orderBy,
  filter,
}) => {
  const {loading} = useLoading()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [allDogs, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.flexFilter}>
          <OrderBy orderBy={orderBy} />
          <Filter filter={filter} paginate={paginate} allDogs={allDogs} />
        </div>
        <div className={styles.FlexCard}>
          {loading ? <Loading /> : <Cards dogs={currentDogs} />}
        </div>
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        totalDogs={dogs.length}
        paginate={paginate}
        currentPage={currentPage}
        allDogs={allDogs}
      />
    </div>
  );
};

export default Home;