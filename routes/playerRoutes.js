const express = require("express");

const app = express.Router();

const {
  getAllPlayers,
  getOnePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playerControllers");

app.route("/").get(getAllPlayers).post(createPlayer);
app.route("/:id").get(getOnePlayer).put(updatePlayer).delete(deletePlayer);

module.exports = app;
