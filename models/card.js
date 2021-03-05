const mongoose = require("mongoose");
const Joi = require("joi");
// CARD SCHEMA
const cardSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 1 },
  answer: { type: String, required: true, minlength: 1 },
  lastDateModfied: { type: Date, default: Date.now },
});

// CARD MODEL
const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    question: Joi.string().required().minlength(1),
    answer: Joi.String().required().minlength(1),
    lastDateModfied: Joi.Date().default(Date.now),
  });
  return schema.validate(card);
}

exports.cardSchema = cardSchema;
exports.Card = Card;
exports.validate = validateCard;
