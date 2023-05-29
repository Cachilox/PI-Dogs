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

export const getTempTextCard = (temperament) => {
  let arr = temperament?.split(",");
  const firstThree = arr?.slice(0, 3);

  let tempTxt = firstThree?.join(", ");
  return tempTxt
}

export const getTempTextDetail = (temperament) => {
  let temp = temperament?.split(",");
  let tempTxt = temp?.join(", ");
  return tempTxt
}

