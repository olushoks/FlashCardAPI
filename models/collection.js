const mongoose = require("mongoose");
const Joi = require("joi");
const { cardSchema } = require("./card");

// COLLECTION SCHEMA
const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 15 },
  lastDateModifed: { type: Date, default: Date.now },
  cards: { type: [cardSchema], default: [] },
});

// COLLECTION MODEL
const Collection = mongoose.model("Collection", collectionSchema);

function validateCollection(collection) {
  const schema = Joi.object({
    title: Joi.string().required().min(1).max(15),
    lastDateModified: Joi.date().default(Date.now),
  });
  return schema.validate(collection);
}

exports.collectionSchema = collectionSchema;
exports.Collection = Collection;
exports.validateCollection = validateCollection;
