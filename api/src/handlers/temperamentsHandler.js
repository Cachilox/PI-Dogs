const getAllTemperaments = require("../controllers/getAllTemperaments");

const allTemperamentsHandler = async (req, res) => {
  try {
    const allTemp = await getAllTemperaments();
    return res.status(200).json(allTemp);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = allTemperamentsHandler