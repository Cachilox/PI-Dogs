import { ActionTypes } from "../action-types/action-types";

const initialState = {
  allDogs: [],
  dogs: [],
  temperaments: [],
  allTemperaments: [],
  breeds: [],
  dogDetails: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DETAILS:
      return {
        ...state,
        dogDetails: payload,
      };
    case ActionTypes.SEARCH_BREED:
      if (payload === "") return { ...state, breeds: state.allDogs };
      const breed = state.allDogs.filter((dog) => {
        return dog.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, breeds: breed };
    case ActionTypes.SEARCH_TEMPERAMENT:
      if (payload === "")
        return { ...state, temperaments: state.allTemperaments };

      const temp = state.allTemperaments.filter((e) => {
        return e.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, temperaments: temp };
    case ActionTypes.FILTER_BY_TEMPERAMENT:
      let filterTemperament = [];
      if (payload.length === 0) {
        return { ...state, dogs: state.allDogs };
      }
      state.dogs.forEach((dog) => {
        if (dog.temperament) {
          let cont = 0;
          payload.forEach((e) => {
            if (dog.temperament.includes(e)) {
              cont++;
            }
          });
          if (cont === payload.length) {
            filterTemperament.push(dog);
          }
        } else {
          return false;
        }
      });
      filterTemperament = filterTemperament.filter(
        (e, i) => filterTemperament.indexOf(e) === i
      );
      return { ...state, dogs: filterTemperament };
    case ActionTypes.FILTER_BY_BREED:
      if (payload.length === 0) {
        return { ...state, dogs: state.allDogs };
      }
      const filterBreed = state.allDogs.filter((e) => payload.includes(e.name));
      return { ...state, dogs: filterBreed };
    case ActionTypes.FILTER_CREATED:
      const allDogs = state.allDogs;
      const filterCreated =
        payload === "created"
          ? allDogs.filter((d) => d.createdInDb)
          : allDogs.filter((d) => !d.createdInDb);
      return {
        ...state,
        dogs: payload === "all" ? state.allDogs : filterCreated,
      };
    case ActionTypes.GET_ALL_DOGS:
      return {
        ...state,
        allDogs: payload,
        dogs: payload,
        breeds: payload,
      };
    case ActionTypes.GET_BY_BREED:
      return {
        ...state,
        dogs: payload,
      };
    case ActionTypes.GET_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: payload,
        temperaments: payload,
      };
    case ActionTypes.ORDER_BY_ALPHABET:
      const copy = [...state.dogs];
      const ordered = copy.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      if (payload === "Ascendent") {
        return { ...state, dogs: ordered };
      } else if (payload === "Descendent") {
        return { ...state, dogs: ordered.reverse() };
      }
      return state;
    case ActionTypes.ORDER_BY_WEIGHT:
      const copyWeight = [...state.dogs];
      const orderedWeight = copyWeight.sort((a, b) => {
        const weightA = Number(a.weightMin) || 0;
        const weightB = Number(b.weightMin) || 0;

        if (weightA < weightB) return -1;
        if (weightA > weightB) return 1;
        return 0;
      });

      if (payload === "Ascendent") {
        return { ...state, dogs: orderedWeight };
      } else if (payload === "Descendent") {
        return { ...state, dogs: orderedWeight.reverse() };
      }
      return state;
    case ActionTypes.CLEAN_DETAIL:
      return {
        ...state,
        dogDetails: {},
      };
    default:
      return { ...state };
  }
};

export default reducer;
