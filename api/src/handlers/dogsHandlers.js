const {
  getAllDogs,
  getDogsById,
  createDog,
} = require("../controllers/getAllDogs");

const allDogsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const apiInfo = await getAllDogs(name);
    return res.status(200).json(apiInfo);
  } catch (error) {
    return res.status(400).json({
      message: "Couldn't get all the dogs",
      error: error.message,
    });
  }
};

const dogsByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dogsId = await getDogsById(id);
    return res.status(200).json(dogsId);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createDogsHandler = async (req, res) => {
  try {
    const {
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      temperament,
    } = req.body;

    let newDog = await createDog(
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      temperament
    );

    return res.status(201).json(newDog);
  } catch (error) {
    return res.status(400).send({
      message: "There was an error creating the dog",
      error: error.message,
    });
  }
};

module.exports = {
  allDogsHandler,
  dogsByIdHandler,
  createDogsHandler,
};
