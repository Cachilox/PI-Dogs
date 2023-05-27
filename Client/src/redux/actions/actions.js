import { ActionTypes } from "../action-types/action-types";
import axios from "axios";
import { toast } from "react-toastify";

const notify = (breed) => {
  toast.warn(`${breed} the dog doesn't exist`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const details = (detailID) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`dogs/${detailID}`);

      dispatch({
        type: ActionTypes.DETAILS,
        payload: data,
      });
    } catch (error) {
      console.error("Details" + error.message);
    }
  };
};

export const searchBreed = (value) => {
  return {
    type: ActionTypes.SEARCH_BREED,
    payload: value,
  };
};

export const searchTemperament = (value) => {
  return {
    type: ActionTypes.SEARCH_TEMPERAMENT,
    payload: value,
  };
};

export const filterByTemperament = (value) => {
  return {
    type: ActionTypes.FILTER_BY_TEMPERAMENT,
    payload: value,
  };
};

export const filterCreated = (value) => {
  return {
    type: ActionTypes.FILTER_CREATED,
    payload: value,
  };
};

export const orderByAlphabet = (value) => {
  return {
    type: ActionTypes.ORDER_BY_ALPHABET,
    payload: value,
  };
};

export const orderWeight = (value) => {
  return {
    type: ActionTypes.ORDER_BY_WEIGHT,
    payload: value,
  };
};

export const postDog = (dog) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/dogs`, dog);

      dispatch({
        type: ActionTypes.POST_DOG,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getAllDogs = () => {
  return async (dispatch) => {
    const { data } = await axios("/dogs");
    dispatch({
      type: ActionTypes.GET_ALL_DOGS,
      payload: data,
    });
  };
};

export const getByBreed = (breed) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`dogs?name=${breed}`);
      if (data.length === 0) {
        notify(breed);
        return;
      }
      dispatch({
        type: ActionTypes.GET_BY_BREED,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    const { data } = await axios("/temperaments");
    dispatch({
      type: ActionTypes.GET_TEMPERAMENTS,
      payload: data,
    });
  };
};

export const cleanDetail = () => {
  return { type: ActionTypes.CLEAN_DETAIL };
};
