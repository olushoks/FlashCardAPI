const mongoose = require("mongoose");

// CARD SCHEMA
const cardSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 1 },
  answer: { type: String, required: true, minlength: 1 },
  dateCreated: { type: Date, default: Date.now },
  lastTimeModfied: { type: Date, default: Date.now },
});

// CARD MODEL
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
