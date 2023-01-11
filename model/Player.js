const mongoose = require("mongoose");

const { Schema } = mongoose;

const playerSchema = new Schema({
  // name, score, active
  name: {
    type: String,
    required: true,
  },

  score: {
    type: Number,
    default: 0,
  },

  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
