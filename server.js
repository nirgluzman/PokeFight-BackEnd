const express = require("express");
const app = express();
const PORT = process.env.PORT || 3010;

const { check, validationResult } = require("express-validator");

const cors = require("cors");
app.use(cors());

let jsonData = require("./file.json");

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to PokeFight");
});

// GET  /pokemon  => get the complete list of pokemons
app.get("/pokemon", (req, res) => {
  res.json(jsonData);
});

// GET  /pokemon/id/:id  => get a pokemon by id
app.get(
  "/pokemon/id/:id",
  check("id").isInt().withMessage("must be an integer"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const pokemon = jsonData.find((item) => item.id == id);
    res.json(pokemon);
  }
);

// GET  /pokemon/id/:id/:info  => get a pokemon and retrieve the required information
app.get(
  "/pokemon/id/:id/:info",
  check("id").isInt().withMessage("must be an integer"),
  check("info")
    .isIn(["name", "type", "base"])
    .withMessage("must be a name, type or base"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, info } = req.params;
    const pokemon = jsonData.find((item) => item.id == id);
    res.json(pokemon[info]);
  }
);

// GET  /pokemon/names?start=XXX  => get pokemons whose name starts with XXX
app.get("/pokemon/names", (req, res) => {
  const { start } = req.query;
  const pokemonList = jsonData.filter((item) =>
    item.name.english.toLowerCase().startsWith(start.toLowerCase())
  );
  res.json(pokemonList);
});
