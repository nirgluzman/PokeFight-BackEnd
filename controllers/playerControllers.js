const Players = require("../model/Player");

const getAllPlayers = async (req, res) => {
  try {
    const players = await Players.find().sort({ score: -1 });
    res.status(200).json({
      success: true,
      players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getTopPlayers = async (req, res) => {
  try {
    const players = await Players.find({ active: false })
      .sort({ score: -1 })
      .limit(req.params.num);
    res.status(200).json({
      success: true,
      players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getOnePlayer = async (req, res) => {
  try {
    const player = await Players.findById(req.params.id);
    res.status(200).json({
      success: true,
      player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getActivePlayers = async (req, res) => {
  try {
    const numActive = await Players.find({ active: true }).count();
    res.status(200).json({
      success: true,
      numActive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const createPlayer = async (req, res) => {
  try {
    const { name } = req.body;
    const player = await Players.create({ name });
    res.status(201).json({
      success: true,
      player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid data",
      error,
    });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const player = await Players.findByIdAndUpdate(
      req.params.id,
      { score: req.body.score, active: req.body.active },
      {
        new: true, // to return the modified document
      }
    );
    res.status(200).json({ success: true, player });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    await Players.findByIdAndDelete(req.params.id);
    res.status(200).json({
      response: "Player deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllPlayers,
  getTopPlayers,
  getOnePlayer,
  getActivePlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
