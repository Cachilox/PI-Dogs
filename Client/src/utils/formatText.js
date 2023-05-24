export const getHeightText = (heightMin, heightMax) => {
  if (heightMin && heightMax) {
    return `${heightMin} - ${heightMax} Cm`;
  } else if (heightMin || heightMax) {
    return `${heightMin || heightMax} Cm`;
  } else {
    return " - - ";
  }
};

export const getWeightText = (weightMin, weightMax) => {
  if (weightMin && weightMax) {
    return `${weightMin} - ${weightMax} Kg`;
  } else if (weightMin || weightMax) {
    return `${weightMin || weightMax} Kg`;
  } else {
    return " - - ";
  }
};

export const getLifeSpanText = (lifeSpanMin, lifeSpanMax) => {
  if(lifeSpanMin && lifeSpanMax) {
    return `${lifeSpanMin} - ${lifeSpanMax} Years`;
  }else if(lifeSpanMin || lifeSpanMax) {
    return `${lifeSpanMin || lifeSpanMax} Years`;
  } else {
    return " - - "
  }
}

