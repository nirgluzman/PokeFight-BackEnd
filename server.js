require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Leaderboard database
const connectDB = require("./dbinit");
connectDB();

const app = express();

const PORT = process.env.PORT || 3080;

const players = require("./routes/playerRoutes");
const pokemon = require("./routes/pokemonRoutes");

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/pokemon", pokemon);
app.use("/game/leaderboard", players);

app.get("/", (req, res) => {
  res.send("Welcome to PokeFight backend API");
});
