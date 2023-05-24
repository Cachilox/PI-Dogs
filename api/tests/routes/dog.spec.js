/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);

const URL = "/dogs/";
const dog = {
  name: "Pug",
  id: 300,
  image: "https://cdn2.thedogapi.com/images/6f5n_42mB.jpg",
  heightMin: "10",
  heightMax: "25",
  weightMin: "8",
  weightMax: "10",
  lifeSpanMin: "3",
  lifeSpanMax: "15",
  temperament:["Playful","Active","Loyal"]
};

describe("Dog routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
  describe("GET /dogs/:id", () => {
    it("should get 200", () => agent.get(`${URL}${dog.id}`).expect(200));
  });
});
