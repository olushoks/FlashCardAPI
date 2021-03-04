const mongoose = require("mongoose");

// CARD SCHEMA
const cardSchema = new mongoose.Schema({
  category: { type: String, required: true, minlength: 5 },
  question: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  lastModfied: { type: Date, default: Date.now },
});

// CARD MODEL
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
