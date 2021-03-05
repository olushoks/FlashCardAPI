const Card = require("../models/card");
const express = require("express");
const router = express.Router();

// POST HANDLER
router.post("/", async (req, res) => {
  try {
    const card = new Card({
      question: "JS is acronym for?",
      answer: "JavaScript",
    });
    await card.save();
    return res.send(card);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

module.exports = router;
