import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDogs,
  getTemperaments,
  getByBreed,
  orderByAlphabet,
  orderWeight,
  filterByTemperament,
  filterCreated
} from "./redux/actions/actions";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Form from "./pages/Form/Form";
import DogDetail from "./components/DogDetail/DogDetail";
import Footer from "./components/Footer/Footer";
import axios from "axios";
axios.defaults.baseURL = "https://pi-dogs-production-0391.up.railway.app/"

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  const location = useLocation();
  const show = location.pathname !== "/";

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const allDogs = useCallback(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const allTemps = useCallback(() => {
    dispatch(getTemperaments());
  }, [dispatch])

  const onSearch = (race) => {
    dispatch(getByBreed(race));
  };

  useEffect(() => {
    // dispatch(getTemperaments());
    allTemps()
    allDogs();
  }, [allDogs, allTemps]);

  const orderBy = (name, value) => {
    if (name === "Alphabetic") {
      dispatch(orderByAlphabet(value));
    } else if (name === "Weight") {
      dispatch(orderWeight(value));
    }
  };

  const filter = (name, value) => {
    if (name === "Temperaments") {
      dispatch(filterByTemperament(value));
    }else if(name === "FilterCreated") {
      dispatch(filterCreated(value));
    }
  };

  return (
    <div className="App">
      {show && <Navbar onSearch={onSearch} paginate={paginate} />}
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/home"
          element={
            <Home
              currentPage={currentPage}
              dogsPerPage={dogsPerPage}
              currentDogs={currentDogs}
              paginate={paginate}
              dogs={dogs}
              allDogs={allDogs}
              orderBy={orderBy}
              filter={filter}
              allTemps={allTemps}
            />
          }
        />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<DogDetail />} />
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
      {show && <Footer />}
    </div>
  );
}

export default App;
