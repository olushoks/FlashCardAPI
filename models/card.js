const mongoose = require("mongoose");
const Joi = require("joi");

// CARD SCHEMA
const cardSchema = new mongoose.Schema({
  question: { type: String, required: true, min: 1 },
  answer: { type: String, required: true, minlength: 1 },
  lastDateModfied: { type: Date, default: Date.now },
});

// CARD MODEL
const Card = mongoose.model("Card", cardSchema);

// VALIDATE USER DATA ACCURACY
function validateCard(card) {
  const schema = Joi.object({
    question: Joi.string().required().min(1),
    answer: Joi.string().required().min(1),
    lastDateModfied: Joi.date().default(Date.now),
  });
  return schema.validate(card);
}

exports.cardSchema = cardSchema;
exports.Card = Card;
exports.validateCard = validateCard;
