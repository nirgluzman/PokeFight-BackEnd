const express = require("express");

const app = express.Router();

const {
  getAllPlayers,
  getTopPlayers,
  getOnePlayer,
  getActivePlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playerControllers");

app.route("/").get(getAllPlayers).post(createPlayer);
app.route("/:id").get(getOnePlayer).put(updatePlayer).delete(deletePlayer);
app.route("/top/:num").get(getTopPlayers);
app.route("/players/active").get(getActivePlayers);

module.exports = app;
