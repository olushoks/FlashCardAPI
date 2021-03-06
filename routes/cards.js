const { Card, validateCard } = require("../models/card");
const express = require("express");
const router = express.Router();

// GET REQUEST
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    return res.send(cards);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const card = await Card.findById(id);

    if (!card)
      return res
        .status(400)
        .send(
          `"${id}" does not correspond to any existing card. Please provide a  valid ID`
        );

    return res.send(card);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// POST REQUEST
router.post("/", async (req, res) => {
  try {
    const { error } = validateCard(req.body);

    if (error) return res.status(400).send(error);

    const card = new Card({
      question: req.body.question,
      answer: req.body.answer,
    });

    await card.save();

    return res.send(card);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT REQUEST
router.put("/:id", async (req, res) => {
  try {
    //get card id from requests body
    const id = req.params.id;

    const { error } = validateCard(req.body);
    if (error) res.status(400).send(error);

    const card = await Card.findByIdAndUpdate(
      id,
      {
        question: req.body.question,
        answer: req.body.answer,
      },
      { new: true }
    );

    if (!card)
      return res
        .status(400)
        .send(
          `"${id}" does not correspond to any existing card. Please provide a  valid ID`
        );

    await card.save();
    return res.send(card);
  } catch (error) {
    res.status(500).send(`Internal Server Error:  ${error}`);
  }
});

// DELETE REEQUEST
router.delete("/:id", async (req, res) => {
  try {
    //get card id from requests body
    const id = req.params.id;
    const card = await Card.findByIdAndRemove(id);

    if (!card)
      return res
        .status(400)
        .send(
          `"${id}" does not correspond to any existing card. Please provide a  valid ID`
        );

    return res.send(card);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
