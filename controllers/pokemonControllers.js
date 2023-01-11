// Pokemon database
let jsonData = require("../file.json");

const validator = require("validator");

// get the complete list of pokemons
const getAllPokemons = (req, res) => {
  res.json(jsonData);
};

// get all pokemons whose name starts with XXX
const getAllPokemonsStartWith = (req, res) => {
  const { start } = req.query;
  const pokemonList = jsonData.filter((item) =>
    item.name.english.toLowerCase().startsWith(start.toLowerCase())
  );
  res.json(pokemonList);
};

// get a pokemon by id
const getOnePokemon = (req, res) => {
  const { id } = req.params;

  if (!validator.isInt(id)) {
    return res
      .status(400)
      .json({ success: false, error: "id must be an integer" });
  }

  const pokemon = jsonData.find((item) => item.id == id);
  res.json(pokemon);
};

// GET  /pokemon/id/:id/:info  => get a pokemon and retrieve the required information
const getOnePokemonAndInfo = (req, res) => {
  const { id, info } = req.params;

  if (!validator.isInt(id)) {
    return res
      .status(400)
      .json({ success: false, error: "id must be an integer" });
  }

  if (!validator.isIn(info, ["name", "type", "base"])) {
    return res
      .status(400)
      .json({ success: false, error: "info must be a name, type or base" });
  }

  const pokemon = jsonData.find((item) => item.id == id);
  res.json(pokemon[info]);
};

module.exports = {
  getAllPokemons,
  getAllPokemonsStartWith,
  getOnePokemon,
  getOnePokemonAndInfo,
};
