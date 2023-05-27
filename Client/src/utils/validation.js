const validation = (dogData, dogTemperaments) => {
  const errors = {};

  if (!dogData.name) {
    errors.name = "Please enter a value";
  } else if (!dogData.heightMin || !dogData.heightMax) {
    errors.height = "Please enter both values";
  } else if (parseInt(dogData.heightMin) > parseInt(dogData.heightMax)) {
    errors.height = "Min height must be less than max height";
  } else if (!dogData.weightMin || !dogData.weightMax) {
    errors.weight = "Please enter both values";
  } else if (parseInt(dogData.weightMin) > parseInt(dogData.weightMax)) {
    errors.weight = "Min weight must be less than max weight";
  } else if (!dogData.lifeSpanMin || !dogData.lifeSpanMax) {
    errors.lifeSpan = "Please enter both values";
  } else if (parseInt(dogData.lifeSpanMin) > parseInt(dogData.lifeSpanMax)) {
    errors.lifeSpan = "Min life span must be less than max life span";
  } else if (dogTemperaments.length === 0) {
    errors.temperaments = "Please select at least one dog temperament";
  }

  return errors;
};

export default validation;
