require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getAllTemperaments = require("./src/controllers/getAllTemperaments.js")
const {PORT} = process.env
// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    getAllTemperaments();
    console.log(`server listening at port ${PORT}...`);
  });
});


