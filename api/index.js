require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getAllTemperaments = require("./src/controllers/getAllTemperaments.js")

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    getAllTemperaments();
    console.log('server listening at port 3001...');
  });
});


