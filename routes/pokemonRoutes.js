const express = require("express");

const app = express.Router();

const {
  getAllPokemons,
  getAllPokemonsStartWith,
  getOnePokemon,
  getOnePokemonAndInfo,
} = require("../controllers/pokemonControllers");

// GET  /pokemon  => get the complete list of pokemons
app.route("/").get(getAllPokemons);

// GET  /pokemon/names?start=XXX  => get all pokemons whose name starts with XXX
app.route("/names").get(getAllPokemonsStartWith);

// GET  /pokemon/id/:id  => get a pokemon by id
app.route("/id/:id").get(getOnePokemon);

// GET  /pokemon/id/:id/:info  => get a pokemon and retrieve the required information
app.route("/id/:id/:info").get(getOnePokemonAndInfo);

module.exports = app;
