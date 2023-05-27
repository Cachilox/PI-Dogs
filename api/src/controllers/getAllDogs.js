const axios = require("axios");
const { API_URL, API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const createDogObjDB = (res) => {
  let {
    id,
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpanMin,
    lifeSpanMax,
    Temperaments,
    createdInDb
  } = res[0].dataValues;

  let dogTemperaments = Temperaments.map((data) => data.dataValues.name);
  dogTemperaments = [...dogTemperaments].join();

  return (dogObj = {
    id,
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpanMin,
    lifeSpanMax,
    temperament: dogTemperaments,
    createdInDb
  });
};

const getAllDogsApi = async () => {
  try {
    const response = await axios(`${API_URL}?api_key=${API_KEY}`);
    const allDogs = await response.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        heightMin: dog.height.metric.split("-")[0],
        heightMax: dog.height.metric.split("-")[1],
        weightMin: dog.weight.metric.split("-")[0],
        weightMax: dog.weight.metric.split("-")[1],
        temperament: dog.temperament,
        image: dog.image.url,
        lifeSpanMin: dog.life_span.slice(0, 7).split("-")[0],
        lifeSpanMax: dog.life_span.slice(0, 7).split("-")[1],
      };
    });
    return allDogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDogsDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  }).then((response) => {
    return response.map((res) => createDogObjDB([res]));
  });
};

const getAllDogs = async (name) => {
  const dogsApi = await getAllDogsApi();
  const dogsDB = await getDogsDb();
  const getAllDogs = dogsDB.concat(dogsApi);

  let oneDog = null;
  if (name) {
    oneDog = getAllDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    // if (oneDog.length === 0) return "No dogs with that name found";
    return oneDog;
  }
  return await getAllDogs;
};

const getDogsById = async (id) => {
  const dogsInfo = await getAllDogs();

  const dogsById = await dogsInfo.find((dog) => dog.id === Number(id));
  
  if (dogsById.length === 0) return "No dogs found with that ID";
  return dogsById;
};

const createDog = async (
  name,
  image,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpanMin,
  lifeSpanMax,
  temperament
) => {
  const dogsInfo = await getAllDogs();
  let maxId = 0;

  dogsInfo.forEach(dog => {
    if (dog.id > maxId) {
      maxId = dog.id
    }
  });

  const id = maxId + 1;
  let getTemperaments = await Temperament.findAll({
    where: { name: temperament },
  });

  getTemperaments = getTemperaments.map((el) => el.id);

  const [dog, created] = await Dog.findOrCreate({
    where: { name },
    defaults: {
      id,
      name,
      image: image || "https://img.freepik.com/free-vector/cute-dog-waving-hand-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-4955.jpg?w=2000",
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax
    },
  });

  if (!created) {
    return "The dog already exists";
  }

  await dog.addTemperaments(getTemperaments);

  let newDog;
  await Dog.findOne({
    where: {name},
    include: {
      model: Temperament,
      attributes: ['name']
    }
  })
  .then(res => newDog = createDogObjDB([res]))
  return newDog
};

module.exports = {
  getAllDogs,
  getDogsById,
  getAllDogsApi,
  getDogsDb,
  createDog
}
